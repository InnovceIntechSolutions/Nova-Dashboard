export const headerStyles = `
  .sup-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #ffffff;
    border-bottom: 1.5px solid #e8edf3;
    box-shadow: 0 2px 12px rgba(30,60,120,0.07);
    font-family: 'Segoe UI', 'Inter', sans-serif;
  }
  .sup-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    height: 60px;
    gap: 16px;
  }
  .sup-header-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1a2e4a;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sup-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  /* Dropdown base */
  .sup-dropdown {
    position: relative;
  }
  .sup-dropdown-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border: 1.5px solid #d0d9e8;
    border-radius: 8px;
    background: #f5f8fc;
    color: #2c4a72;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    user-select: none;
    min-width: 110px;
    justify-content: space-between;
  }
  .sup-dropdown-btn:hover,
  .sup-dropdown-btn.active {
    border-color: #3b7dd8;
    background: #eaf1fb;
    box-shadow: 0 0 0 3px rgba(59,125,216,0.10);
  }
  .sup-dropdown-btn .caret {
    font-size: 0.65rem;
    color: #7a9cc0;
    transition: transform 0.2s;
  }
  .sup-dropdown-btn.open .caret {
    transform: rotate(180deg);
  }
  .sup-dropdown-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 140px;
    background: #fff;
    border: 1.5px solid #d0d9e8;
    border-radius: 10px;
    box-shadow: 0 8px 28px rgba(30,60,120,0.13);
    overflow: hidden;
    z-index: 2000;
    animation: dropIn 0.14s ease;
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sup-dropdown-item {
    padding: 10px 16px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #2c4a72;
    cursor: pointer;
    transition: background 0.1s;
  }
  .sup-dropdown-item:hover {
    background: #eaf1fb;
    color: #1a5cb8;
  }
  .sup-dropdown-item.selected {
    background: #ddeeff;
    color: #1a5cb8;
    font-weight: 700;
  }

  /* Plain input box */
  .sup-input {
    border: 1.5px solid #d0d9e8;
    border-radius: 8px;
    background: #f5f8fc;
    padding: 7px 12px;
    font-size: 0.84rem;
    color: #1a2e4a;
    width: 190px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  }
  .sup-input:focus {
    border-color: #3b7dd8;
    box-shadow: 0 0 0 3px rgba(59,125,216,0.10);
    background: #fff;
  }
  .sup-input::placeholder {
    color: #9fb3cc;
  }

  /* Search button */
  .sup-search-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border: none;
    border-radius: 8px;
    background: #3b7dd8;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
    font-family: inherit;
  }
  .sup-search-btn:hover {
    background: #2563b8;
    box-shadow: 0 4px 14px rgba(59,125,216,0.30);
  }
  .sup-search-btn:active {
    transform: scale(0.97);
  }
  .sup-search-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  /* Month grid dropdown */
  .sup-month-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    width: 240px;
    background: #fff;
    border: 1.5px solid #d0d9e8;
    border-radius: 12px;
    box-shadow: 0 8px 28px rgba(30,60,120,0.13);
    padding: 12px;
    z-index: 2000;
    animation: dropIn 0.14s ease;
  }
  .sup-month-year-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #7a9cc0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 10px;
    text-align: center;
  }
  .sup-month-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  .sup-month-cell {
    padding: 8px 4px;
    text-align: center;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #2c4a72;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    border: 1.5px solid transparent;
  }
  .sup-month-cell:hover:not(.disabled) {
    background: #eaf1fb;
    color: #1a5cb8;
  }
  .sup-month-cell.selected {
    background: #3b7dd8;
    color: #fff;
    font-weight: 700;
    border-color: #3b7dd8;
  }
  .sup-month-cell.disabled {
    color: #c5d4e5;
    cursor: not-allowed;
  }

  /* Date range pickers */
  .sup-daterange {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #f5f8fc;
    border: 1.5px solid #d0d9e8;
    border-radius: 8px;
    padding: 5px 10px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .sup-daterange:focus-within {
    border-color: #3b7dd8;
    box-shadow: 0 0 0 3px rgba(59,125,216,0.10);
    background: #fff;
  }
  .sup-daterange label {
    font-size: 0.72rem;
    font-weight: 700;
    color: #9fb3cc;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
  }
  .sup-daterange input[type="date"] {
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.82rem;
    color: #1a2e4a;
    font-family: inherit;
    cursor: pointer;
  }
  .sup-daterange-sep {
    color: #b0c4d8;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0 2px;
  }

  /* Chip badge for active selection */
  .sup-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #ddeeff;
    color: #1a5cb8;
    border-radius: 20px;
    padding: 3px 10px 3px 8px;
    font-size: 0.75rem;
    font-weight: 700;
  }
  .sup-chip-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3b7dd8;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .sup-header-inner { flex-wrap: wrap; height: auto; padding: 10px 14px; gap: 10px; }
    .sup-input { width: 130px; }
    .sup-header-title { font-size: 0.9rem; }
  }
`;