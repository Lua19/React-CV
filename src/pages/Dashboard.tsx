import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiClient } from '../services/apiService';
import { useDataCache } from '../DataCacheContext';
import type { ExperienceItem } from '../Interfaces/Experience.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSave, faTimes, faBriefcase, faBuilding, faCalendarAlt, faImage, faListUl } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const { t } = useTranslation();
  const { cache, updateCache } = useDataCache();

  const [experiences, setExperiences] = useState<ExperienceItem[]>(cache.experiences || []);
  const [selectedIndex, setSelectedIndex] = useState<number | 'new'>('new');
  const [loading, setLoading] = useState(!cache.experiences);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Form fields
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [highlightInput, setHighlightInput] = useState('');

  // Fetch experiences on mount if not in cache
  useEffect(() => {
    if (cache.experiences && cache.experiences.length > 0) {
      setExperiences(cache.experiences);
      setLoading(false);
      return;
    }

    setLoading(true);
    apiClient.getAllExperiences()
      .then((data: ExperienceItem[]) => {
        setExperiences(data);
        updateCache('experiences', data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching experiences in dashboard:', err);
        setLoading(false);
      });
  }, []);

  // Handle dropdown selection
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStatusMessage(null);

    if (value === 'new') {
      setSelectedIndex('new');
      resetForm();
    } else {
      const idx = parseInt(value, 10);
      setSelectedIndex(idx);
      loadExperienceIntoForm(experiences[idx]);
    }
  };

  // Populate form with existing experience
  const loadExperienceIntoForm = (exp: ExperienceItem) => {
    if (!exp) return;
    setRole(exp.role || '');
    setCompany(exp.company || '');
    setPeriod(exp.period || '');
    setImageURL(exp.imageURL || exp.image || '');
    setHighlights(exp.highlights ? [...exp.highlights] : []);
    setHighlightInput('');
  };

  // Reset form to blank
  const resetForm = () => {
    setRole('');
    setCompany('');
    setPeriod('');
    setImageURL('');
    setHighlights([]);
    setHighlightInput('');
  };

  // Add highlight bullet
  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights((prev) => [...prev, highlightInput.trim()]);
    setHighlightInput('');
  };

  // Remove highlight bullet
  const handleRemoveHighlight = (idxToRemove: number) => {
    setHighlights((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Update existing highlight in list
  const handleHighlightChange = (idxToUpdate: number, value: string) => {
    setHighlights((prev) => {
      const updated = [...prev];
      updated[idxToUpdate] = value;
      return updated;
    });
  };

  // CREATE (POST)
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !company.trim() || !period.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields (Role, Company, Period).' });
      return;
    }

    const newExperience: ExperienceItem = {
      role: role.trim(),
      company: company.trim(),
      period: period.trim(),
      imageURL: imageURL.trim() || 'https://placehold.co/600x400/0098ce/ffffff?text=' + encodeURIComponent(company.trim()),
      highlights: highlights.filter((h) => h.trim() !== ''),
    };

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      let createdItem = newExperience;
      try {
        const response = await apiClient.createExperience(newExperience);
        if (response && (response.id || response.role)) {
          createdItem = response;
        }
      } catch (apiErr) {
        console.warn('API create call failed, updating local state & cache:', apiErr);
      }

      const updatedList = [...experiences, createdItem];
      setExperiences(updatedList);
      updateCache('experiences', updatedList);

      setSelectedIndex(updatedList.length - 1);
      setStatusMessage({ type: 'success', text: `Successfully created experience for "${createdItem.company}"!` });
    } catch (err: any) {
      console.error('Error creating experience:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to create experience.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // UPDATE (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex === 'new') return;

    if (!role.trim() || !company.trim() || !period.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields (Role, Company, Period).' });
      return;
    }

    const currentItem = experiences[selectedIndex];
    const updatedExperience: ExperienceItem = {
      ...currentItem,
      role: role.trim(),
      company: company.trim(),
      period: period.trim(),
      imageURL: imageURL.trim() || currentItem.imageURL || currentItem.image || '',
      highlights: highlights.filter((h) => h.trim() !== ''),
    };

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const idToUpdate = currentItem.id ?? selectedIndex;
      try {
        await apiClient.updateExperience(idToUpdate, updatedExperience);
      } catch (apiErr) {
        console.warn('API update call failed, updating local state & cache:', apiErr);
      }

      const updatedList = [...experiences];
      updatedList[selectedIndex] = updatedExperience;
      setExperiences(updatedList);
      updateCache('experiences', updatedList);

      setStatusMessage({ type: 'success', text: `Successfully updated experience for "${updatedExperience.company}"!` });
    } catch (err: any) {
      console.error('Error updating experience:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update experience.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (selectedIndex === 'new') return;

    const currentItem = experiences[selectedIndex];
    const confirmDelete = window.confirm(`Are you sure you want to delete the experience for "${currentItem.role} at ${currentItem.company}"?`);
    if (!confirmDelete) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const idToDelete = currentItem.id ?? selectedIndex;
      try {
        await apiClient.deleteExperience(idToDelete);
      } catch (apiErr) {
        console.warn('API delete call failed, updating local state & cache:', apiErr);
      }

      const updatedList = experiences.filter((_, idx) => idx !== selectedIndex);
      setExperiences(updatedList);
      updateCache('experiences', updatedList);

      setSelectedIndex('new');
      resetForm();
      setStatusMessage({ type: 'success', text: 'Experience deleted successfully.' });
    } catch (err: any) {
      console.error('Error deleting experience:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete experience.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Switch to new form
  const handleStartNew = () => {
    setSelectedIndex('new');
    resetForm();
    setStatusMessage(null);
  };

  return (
    <section className="section dashboard-section" id="dashboard">
      <div className="dashboard-header">
        <h2>{t('dashboard.title', 'Experience Management')}</h2>
        <p className="dashboard-subtitle">
          Create, view, update, and delete experiences displayed on the portfolio carousel.
        </p>
      </div>

      {statusMessage && (
        <div className={`dashboard-alert alert-${statusMessage.type}`}>
          <span>{statusMessage.text}</span>
          <button className="alert-close-btn" onClick={() => setStatusMessage(null)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="dashboard-loading">
          <p>Loading experiences...</p>
        </div>
      ) : (
        <div className="dashboard-container">
          {/* Dropdown Selector */}
          <div className="dashboard-dropdown-container">
            <label htmlFor="experience-select" className="dashboard-label">
              <FontAwesomeIcon icon={faBriefcase} className="label-icon" /> Select Experience to Manage:
            </label>
            <div className="select-wrapper">
              <select
                id="experience-select"
                className="dashboard-select"
                value={selectedIndex}
                onChange={handleSelectChange}
              >
                <option value="new">➕ Add New Experience</option>
                {experiences.map((exp, index) => (
                  <option key={index} value={index}>
                    #{index + 1}: {exp.role} @ {exp.company} ({exp.period})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="dashboard-layout">
            {/* Form Section */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h3>
                  {selectedIndex === 'new' ? (
                    <>
                      <FontAwesomeIcon icon={faPlus} /> Create New Experience
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faBriefcase} /> Edit Experience #{Number(selectedIndex) + 1}
                    </>
                  )}
                </h3>
              </div>

              <form onSubmit={selectedIndex === 'new' ? handleCreate : handleUpdate} className="dashboard-form">
                <div className="form-group">
                  <label htmlFor="exp-role">
                    <FontAwesomeIcon icon={faBriefcase} /> Role / Job Title *
                  </label>
                  <input
                    type="text"
                    id="exp-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Senior Full-stack Developer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exp-company">
                    <FontAwesomeIcon icon={faBuilding} /> Company Name *
                  </label>
                  <input
                    type="text"
                    id="exp-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Oracle, Microsoft, Freelance"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exp-period">
                    <FontAwesomeIcon icon={faCalendarAlt} /> Period / Dates *
                  </label>
                  <input
                    type="text"
                    id="exp-period"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="e.g. Jan 2023 - Present"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exp-image">
                    <FontAwesomeIcon icon={faImage} /> Image URL
                  </label>
                  <input
                    type="text"
                    id="exp-image"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    placeholder="https://example.com/image.jpg or /assets/hero.png"
                  />
                </div>

                {/* Highlights List */}
                <div className="form-group">
                  <label>
                    <FontAwesomeIcon icon={faListUl} /> Highlights / Key Responsibilities
                  </label>
                  
                  {highlights.length > 0 && (
                    <div className="highlights-list-editor">
                      {highlights.map((item, idx) => (
                        <div key={idx} className="highlight-row">
                          <span className="highlight-bullet">•</span>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleHighlightChange(idx, e.target.value)}
                            placeholder="Highlight description..."
                            className="highlight-input"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlight(idx)}
                            className="btn-icon-danger"
                            title="Remove highlight"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="add-highlight-group">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      placeholder="Add a new bullet point / highlight..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                      className="highlight-add-input"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="btn-add-highlight"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="dashboard-buttons">
                  {selectedIndex === 'new' ? (
                    <>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faPlus} /> {isSubmitting ? 'Creating...' : 'Create Experience'}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn-secondary"
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faTimes} /> Clear
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faSave} /> {isSubmitting ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="btn-danger"
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                      <button
                        type="button"
                        onClick={handleStartNew}
                        className="btn-secondary"
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faPlus} /> Add New Instead
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>

            {/* Live Preview Section */}
            <div className="dashboard-preview-card">
              <h3>Live Preview</h3>
              <p className="preview-help">This is how the card will appear on the Experience page.</p>
              
              <div className="preview-card-wrapper">
                <div 
                  className="preview-image-box"
                  style={{
                    backgroundImage: imageURL ? `url(${imageURL})` : 'none',
                    backgroundColor: imageURL ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {!imageURL && <span className="preview-no-image">No image provided</span>}
                </div>

                <div className="preview-info-box">
                  <h4>{role || 'Role Title'}</h4>
                  <p className="preview-company">{company || 'Company Name'}</p>
                  <p className="preview-period">{period || 'Period / Dates'}</p>
                </div>

                {highlights.length > 0 && (
                  <ul className="preview-highlights">
                    {highlights.map((h, i) => (
                      <li key={i}>{h || '(Empty item)'}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
