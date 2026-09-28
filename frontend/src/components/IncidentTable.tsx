```tsx
import React from "react";

interface Incident {
  id: number;
  name: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "Investigating" | "Contained" | "Closed";
  source: string;
  date: string;
}

const rows: Incident[] = [
  {
    id: 1,
    name: "CVE-2025-32433",
    severity: "High",
    status: "Investigating",
    source: "Internet",
    date: "2026-09-28",
  },
  {
    id: 2,
    name: "Mozi Botnet",
    severity: "Critical",
    status: "Contained",
    source: "Network",
    date: "2026-09-27",
  },
  {
    id: 3,
    name: "CVE-2023-20198",
    severity: "High",
    status: "Investigating",
    source: "Cisco Router",
    date: "2026-09-26",
  },
  {
    id: 4,
    name: "MVPower DVR Attack",
    severity: "Medium",
    status: "Contained",
    source: "Firewall",
    date: "2026-09-25",
  },
];

function getSeverityClass(
  severity: Incident["severity"],
): string {
  switch (severity) {
    case "Critical":
      return "severity-critical";

    case "High":
      return "severity-high";

    case "Medium":
      return "severity-medium";

    case "Low":
      return "severity-low";

    default:
      return "";
  }
}

function getStatusClass(
  status: Incident["status"],
): string {
  switch (status) {
    case "Open":
      return "status-open";

    case "Investigating":
      return "status-investigating";

    case "Contained":
      return "status-contained";

    case "Closed":
      return "status-closed";

    default:
      return "";
  }
}

export default function IncidentTable() {
  return (
    <div className="incident-table-container">
      <div className="incident-table-header">
        <div>
          <h2>Security Incidents</h2>
          <p>
            Recent incidents detected by the security
            operations center.
          </p>
        </div>

        <button
          type="button"
          className="view-all-button"
        >
          View All
        </button>
      </div>

      <div className="incident-table-wrapper">
        <table className="incident-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Incident</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Source</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className="incident-id">
                    #{row.id}
                  </span>
                </td>

                <td>
                  <span className="incident-name">
                    {row.name}
                  </span>
                </td>

                <td>
                  <span
                    className={`severity-badge ${getSeverityClass(
                      row.severity,
                    )}`}
                  >
                    {row.severity}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${getStatusClass(
                      row.status,
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td>{row.source}</td>

                <td>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="empty-incidents">
          <p>No security incidents found.</p>
        </div>
      )}
    </div>
  );
}
```

### Add this CSS

Put this in your `frontend/src/index.css`:

```css
.incident-table-container {
  width: 100%;
  background: #0d131e;
  border: 1px solid #1d2939;
  border-radius: 10px;
  overflow: hidden;
}

.incident-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #1d2939;
}

.incident-table-header h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 16px;
}

.incident-table-header p {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 12px;
}

.view-all-button {
  padding: 8px 14px;
  border: 1px solid #263244;
  border-radius: 6px;
  background: #111827;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 12px;
}

.view-all-button:hover {
  background: #172033;
}

.incident-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.incident-table {
  width: 100%;
  border-collapse: collapse;
}

.incident-table th {
  padding: 13px 18px;
  text-align: left;
  background: #0a1019;
  color: #64748b;
  border-bottom: 1px solid #1d2939;
  font-size: 11px;
  font-weight: 600;
}

.incident-table td {
  padding: 15px 18px;
  color: #cbd5e1;
  border-bottom: 1px solid #182131;
  font-size: 12px;
}

.incident-table tbody tr:hover {
  background: #101927;
}

.incident-id {
  color: #64748b;
}

.incident-name {
  color: #e2e8f0;
  font-weight: 600;
}

.severity-badge,
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 9px;
  border-radius: 5px;
  font-size: 9px;
  font-weight: 700;
}

/* Severity */

.severity-critical {
  background: #3b1119;
  color: #f87171;
}

.severity-high {
  background: #381a16;
  color: #fb923c;
}

.severity-medium {
  background: #332b0e;
  color: #facc15;
}

.severity-low {
  background: #12301f;
  color: #4ade80;
}

/* Status */

.status-open {
  background: #32171b;
  color: #fca5a5;
}

.status-investigating {
  background: #172554;
  color: #93c5fd;
}

.status-contained {
  background: #12301f;
  color: #86efac;
}

.status-closed {
  background: #1e293b;
  color: #94a3b8;
}

.empty-incidents {
  padding: 40px;
  text-align: center;
  color: #64748b;
}

@media (max-width: 700px) {
  .incident-table-header {
    align-items: flex-start;
    gap: 12px;
    flex-direction: column;
  }

  .incident-table th,
  .incident-table td {
    white-space: nowrap;
  }
}
```

### Use it in `Dashboard.tsx`

```tsx
import IncidentTable from "../components/IncidentTable";

export default function Dashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Security Dashboard</h1>
          <p>
            Real-time overview of your security environment.
          </p>
        </div>

        <button className="primary-button">
          + Create Incident
        </button>
      </div>

      <IncidentTable />
    </div>
  );
}
```

This version does **not require any external library** beyond React, so it should compile cleanly in your existing React/TypeScript frontend.
