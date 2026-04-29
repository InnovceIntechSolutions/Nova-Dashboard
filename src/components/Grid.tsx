// src/components/SupplierScorecardGrid.tsx
import React, { useState, useMemo } from "react";
import type { SupplierScorecardProps } from "../constants/types";

type BadgeLevel = "good" | "fair" | "poor";

const getScoreLevel = (score: number): BadgeLevel => {
  if (score >= 85) return "good";
  if (score >= 70) return "fair";
  return "poor";
};

const isTextLabel = (val: string) => isNaN(parseFloat(val));

const getBadge = (val: string): { level: BadgeLevel; display: string } => {
  if (isTextLabel(val)) {
    const normalized = val.toUpperCase();

    const level: BadgeLevel =
      normalized === "GOOD"
        ? "good"
        : normalized === "FAIR"
        ? "fair"
        : "poor";

    return {
      level,
      display: normalized.charAt(0) + normalized.slice(1).toLowerCase(),
    };
  }

  const num = parseFloat(val);
  return {
    level: getScoreLevel(num),
    display: `${num.toFixed(0)}%`,
  };
};

// ✅ FIXED typing (important)
const badgeStyles: Record<BadgeLevel, { bg: string; color: string }> = {
  good: { bg: "#ecfdf5", color: "#166534" },
  fair: { bg: "#fffbeb", color: "#92400e" },
  poor: { bg: "#fef2f2", color: "#991b1b" },
};

const SupplierScorecardGrid: React.FC<SupplierScorecardProps> = (props) => {
  const { Title, Subtitle, Icon, style, ...rest } = props;

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortIndex, setSortIndex] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // Dynamic keys
  const labelKeys = Object.keys(rest)
    .filter((k) => /^label\d+$/.test(k))
    .sort((a, b) => +a.replace("label", "") - +b.replace("label", ""));

  const valueKeys = Object.keys(rest)
    .filter((k) => /^value\d+$/.test(k))
    .sort((a, b) => +a.replace("value", "") - +b.replace("value", ""));

  const nameLabel = (rest[labelKeys[0]] as string) ?? "Supplier";
  const nameValues = ((rest[valueKeys[0]] as string[]) ?? []).slice(0, 50);

  const dataLabels = labelKeys.slice(1).map((k) => rest[k] as string);
  const dataValueKeys = valueKeys.slice(1);

  const processedRows = useMemo(() => {
    let rows = nameValues.map((name, i) => ({
      name,
      values: dataValueKeys.map(
        (k) => (rest[k] as string[])?.[i] ?? "0"
      ),
    }));

    // 🔍 Search
    rows = rows.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );

    // 🔽 Sort
    if (sortIndex !== null) {
      rows.sort((a, b) => {
        const valA = parseFloat(a.values[sortIndex]);
        const valB = parseFloat(b.values[sortIndex]);
        return sortDir === "asc" ? valA - valB : valB - valA;
      });
    }

    return rows;
  }, [nameValues, dataValueKeys, rest, search, sortIndex, sortDir]);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        background: "#fff",
        ...style,
      }}
      className="h-100"
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>
            {Title || "Supplier Scorecard"}
          </div>
          {Subtitle && (
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              {Subtitle}
            </div>
          )}
        </div>

        <input
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 12,
          }}
        />
      </div>

      {/* Table */}
      <div style={{ maxHeight: 360, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead
            style={{
              position: "sticky",
              top: 0,
              background: "#fafafa",
              zIndex: 1,
            }}
          >
            <tr>
              <th style={thStyle}>{nameLabel}</th>

              {dataLabels.map((label, i) => (
                <th
                  key={i}
                  style={{ ...thStyle, cursor: "pointer" }}
                  onClick={() => {
                    setSortIndex(i);
                    setSortDir((prev) =>
                      prev === "asc" ? "desc" : "asc"
                    );
                  }}
                >
                  {label}
                  {sortIndex === i && (
                    <span style={{ marginLeft: 4 }}>
                      {sortDir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}

              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {processedRows.length === 0 ? (
              <tr>
                <td colSpan={dataLabels.length + 2} style={emptyStyle}>
                  No data available
                </td>
              </tr>
            ) : (
              processedRows.map((row, idx) => (
                <tr
                  key={idx}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    background:
                      hoveredRow === idx ? "#f9fafb" : "#fff",
                  }}
                >
                  <td style={tdName}>{row.name}</td>

                  {row.values.map((val, i) => {
                    const { level, display } = getBadge(val);
                    const style = badgeStyles[level];

                    return (
                      <td key={i} style={td}>
                        <span
                          style={{
                            background: style.bg,
                            color: style.color,
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {display}
                        </span>
                      </td>
                    );
                  })}

                  <td style={td}>
                    <span
                      style={{
                        fontSize: 12,
                        cursor: "pointer",
                        color: "#374151",
                      }}
                    >
                      View
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const thStyle: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: 11,
  textAlign: "left",
  color: "#6b7280",
  borderBottom: "1px solid #e5e7eb",
};

const td: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: 12,
  borderBottom: "1px solid #f3f4f6",
};

const tdName: React.CSSProperties = {
  ...td,
  fontWeight: 600,
  color: "#111827",
};

const emptyStyle: React.CSSProperties = {
  padding: 30,
  textAlign: "center",
  color: "#9ca3af",
};

export default SupplierScorecardGrid;