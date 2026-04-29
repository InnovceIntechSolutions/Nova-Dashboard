import React, { useState, useRef, useEffect } from 'react';
import { headerStyles } from './Header.styles';
import { useSearch } from '../Context/SearchContext';



export interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  style?: React.CSSProperties;
}

type DocType = 'PO' | 'INVOICE' | null;
type DateFilterType = 'MONTH' | 'DATE RANGE' | null;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ title }) => {
  const config = {
    props: { title: 'Supplier Portal - Welcome Back, ABC Suppliers Ltd' },
  };
  const { title: configTitle } = config.props;

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();

  // State
  const [docType, setDocType]               = useState<DocType>(null);
  const [inputText, setInputText]           = useState('');
  const [dateFilter, setDateFilter]         = useState<DateFilterType>(null);
  const [selectedMonth, setSelectedMonth]   = useState<number | null>(null);
  const [fromDate, setFromDate]             = useState('');
  const [toDate, setToDate]                 = useState('');

  // Dropdown open states
  const [docDropdownOpen, setDocDropdownOpen]   = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  // Refs for outside click
  const docRef   = useRef<HTMLDivElement>(null);
  const dateRef  = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);

  const { setFilters } = useSearch();

const handleSearch = () => {
  const month =
    dateFilter === 'MONTH' && selectedMonth !== null
      ? String(selectedMonth + 1).padStart(2, '0')  // "01"–"12"
      : '';

  setFilters({
    invoiceNumber: docType === 'INVOICE' ? inputText : '',
    poNumber:      docType === 'PO'      ? inputText : '',
    fromDate:      dateFilter === 'DATE RANGE' ? fromDate : '',
    toDate:        dateFilter === 'DATE RANGE' ? toDate   : '',
    month,
  });
};

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (docRef.current   && !docRef.current.contains(e.target as Node))   setDocDropdownOpen(false);
      if (dateRef.current  && !dateRef.current.contains(e.target as Node))  setDateDropdownOpen(false);
      if (monthRef.current && !monthRef.current.contains(e.target as Node)) setMonthDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleDocSelect = (val: DocType) => {
    setDocType(val);
    setInputText('');
    setDocDropdownOpen(false);
  };

  const handleDateFilterSelect = (val: DateFilterType) => {
    setDateFilter(val);
    setSelectedMonth(null);
    setFromDate('');
    setToDate('');
    setDateDropdownOpen(false);
    if (val === 'MONTH') setMonthDropdownOpen(true);
  };

  const handleMonthSelect = (idx: number) => {
    setSelectedMonth(idx);
    setMonthDropdownOpen(false);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Search button is enabled when a date/month selection is complete
  const dateReady =
    (dateFilter === 'MONTH' && selectedMonth !== null) ||
    (dateFilter === 'DATE RANGE' && fromDate && toDate);

  const showSearchBtn = docType && dateReady;

  return (
    <>
      <style>{headerStyles}</style>

      <div className="sup-header">
        <div className="sup-header-inner">

          {/* Title */}
          <div className="sup-header-title">{title || configTitle}</div>

          {/* Right-side Controls */}
          <div className="sup-controls">

            {/* 1. Document Type Dropdown (PO / INVOICE) */}
            <div className="sup-dropdown" ref={docRef}>
              <button
                className={`sup-dropdown-btn${docDropdownOpen ? ' open active' : ''}`}
                onClick={() => setDocDropdownOpen(o => !o)}
                type="button"
              >
                {docType ? (
                  <span className="sup-chip">
                    <span className="sup-chip-dot" />
                    {docType}
                  </span>
                ) : 'Select Type'}
                <span className="caret">▼</span>
              </button>
              {docDropdownOpen && (
                <div className="sup-dropdown-menu">
                  {(['PO', 'INVOICE'] as DocType[]).map(val => (
                    <div
                      key={val!}
                      className={`sup-dropdown-item${docType === val ? ' selected' : ''}`}
                      onClick={() => handleDocSelect(val)}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Plain text input — shown when PO or INVOICE is selected */}
            {docType && (
              <input
                className="sup-input"
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={`Enter ${docType} number`}
                autoFocus
              />
            )}

            {/* 3. Date Filter Dropdown (MONTH / CUSTOM) */}
            <div className="sup-dropdown" ref={dateRef}>
              <button
                className={`sup-dropdown-btn${dateDropdownOpen ? ' open active' : ''}`}
                onClick={() => setDateDropdownOpen(o => !o)}
                type="button"
              >
                {dateFilter ? (
                  <span className="sup-chip">
                    <span className="sup-chip-dot" />
                    {dateFilter}
                  </span>
                ) : 'Date Filter'}
                <span className="caret">▼</span>
              </button>
              {dateDropdownOpen && (
                <div className="sup-dropdown-menu">
                  {(['MONTH', 'DATE RANGE'] as DateFilterType[]).map(val => (
                    <div
                      key={val!}
                      className={`sup-dropdown-item${dateFilter === val ? ' selected' : ''}`}
                      onClick={() => handleDateFilterSelect(val)}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Month Picker — shown when MONTH is selected */}
            {dateFilter === 'MONTH' && (
              <div className="sup-dropdown" ref={monthRef}>
                <button
                  className={`sup-dropdown-btn${monthDropdownOpen ? ' open active' : ''}`}
                  onClick={() => setMonthDropdownOpen(o => !o)}
                  type="button"
                  style={{ minWidth: 130 }}
                >
                  {selectedMonth !== null ? MONTHS[selectedMonth] : 'Pick Month'}
                  <span className="caret">▼</span>
                </button>
                {monthDropdownOpen && (
                  <div className="sup-month-menu">
                    <div className="sup-month-year-label">{currentYear}</div>
                    <div className="sup-month-grid">
                      {MONTHS.map((month, idx) => {
                        const isFuture = idx > currentMonthIndex;
                        return (
                          <div
                            key={month}
                            className={[
                              'sup-month-cell',
                              selectedMonth === idx ? 'selected' : '',
                              isFuture ? 'disabled' : '',
                            ].join(' ')}
                            onClick={() => !isFuture && handleMonthSelect(idx)}
                            title={isFuture ? 'Future month' : month}
                          >
                            {month.slice(0, 3)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Custom Date Range — shown when DATE RANGE is selected */}
            {dateFilter === 'DATE RANGE' && (
              <div className="sup-daterange">
                <label>From</label>
                <input
                  type="date"
                  value={fromDate}
                  max={toDate || todayStr}
                  onChange={e => setFromDate(e.target.value)}
                />
                <span className="sup-daterange-sep">→</span>
                <label>To</label>
                <input
                  type="date"
                  value={toDate}
                  min={fromDate}
                  max={todayStr}
                  onChange={e => setToDate(e.target.value)}
                />
              </div>
            )}

            {/* 6. Search Button — appears only when doc type + date/month are both selected */}
            {showSearchBtn && (
              <button className="sup-search-btn" type="button" onClick={handleSearch}>
                <SearchIcon />
                Search
              </button>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;