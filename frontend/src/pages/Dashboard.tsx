```tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Incident {
  id: number;
  title: string;
  severity: string;
  status: string;
}

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<Incident[]>(
          "http://localhost:8080/api/incidents"
        );

        setIncidents(response.data);
      } catch (err) {
        console.error("Failed to fetch incidents:", err);

        setError(
          "Unable to connect to the CyberShield backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const criticalCount = incidents.filter(
    (incident) => incident.severity.toLowerCase() === "critical"
  ).length;

  const highCount = incidents.filter(
    (incident) => incident.severity.toLowerCase() === "high"
  ).length;

  const resolvedCount = incidents.filter(
    (incident) => incident.status.toLowerCase() === "closed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          CyberShield SOC Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Security Operations Center incident monitoring
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Critical */}
        <div className="bg-red-700 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold">
            Critical Incidents
          </h2>

          <p className="text-3xl font-bold mt-2">
            {criticalCount}
          </p>
        </div>

        {/* High */}
        <div className="bg-orange-600 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold">
            High Severity
          </h2>

          <p className="text-3xl font-bold mt-2">
            {highCount}
          </p>
        </div>

        {/* Resolved */}
        <div className="bg-green-700 rounded-xl p-5 shadow-lg">
          <h2 className="text-lg font-semibold">
            Resolved
          </h2>

          <p className="text-3xl font-bold mt-2">
            {resolvedCount}
          </p>
        </div>
      </div>

      {/* Incidents */}
      <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-5 border-b border-slate-700">
          <h2 className="text-xl font-semibold">
            Recent Security Incidents
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">
            Loading incidents...
          </div>
        ) : incidents.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No incidents found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="text-left p-4">
                    ID
                  </th>

                  <th className="text-left p-4">
                    Incident
                  </th>

                  <th className="text-left p-4">
                    Severity
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {incidents.map((incident) => (
                  <tr
                    key={incident.id}
                    className="border-t border-slate-700 hover:bg-slate-750"
                  >
                    <td className="p-4">
                      {incident.id}
                    </td>

                    <td className="p-4 font-medium">
                      {incident.title}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          incident.severity.toLowerCase() ===
                          "critical"
                            ? "bg-red-600"
                            : incident.severity.toLowerCase() ===
                                "high"
                              ? "bg-orange-600"
                              : incident.severity.toLowerCase() ===
                                  "medium"
                                ? "bg-yellow-600"
                                : "bg-green-600"
                        }`}
                      >
                        {incident.severity}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          incident.status.toLowerCase() ===
                          "closed"
                            ? "bg-green-700"
                            : "bg-blue-700"
                        }`}
                      >
                        {incident.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
```

### If `axios` itself gives an error

From your `frontend` directory run:

```bash
npm install axios
```

Then:

```bash
npm run dev
```

### Important backend requirement

Your Go backend must have this endpoint:

```text
GET http://localhost:8080/api/incidents
```

and return JSON like:

```json
[
  {
    "id": 1,
    "title": "CVE-2025-32433",
    "severity": "High",
    "status": "Investigating"
  },
  {
    "id": 2,
    "title": "Mozi Botnet",
    "severity": "Critical",
    "status": "Closed"
  }
]
```

If your Go backend uses a different JSON structure, the React interface needs to match that structure.
