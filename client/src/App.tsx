import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Lead = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
};

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await axios.get(
        "https://smart-leads-dashboard-1-3bf9.onrender.com/api/leads"
      );

      setLeads(res.data.leads || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // HANDLE INPUT
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD LEAD
  const addLead = async () => {
    try {
      await axios.post(
        "https://smart-leads-dashboard-1-3bf9.onrender.com/api/leads",
        form
      );

      setForm({
        name: "",
        email: "",
        phone: "",
      });

      fetchLeads();

      toast.success("Lead Added");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE LEAD
  const deleteLead = async (id: string) => {
    try {
      await axios.delete(
        `https://smart-leads-dashboard-1-3bf9.onrender.com/api/leads/${id}`
      );

      fetchLeads();

      toast.success("Lead Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT LEAD
  const editLead = (lead: Lead) => {
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    });

    setEditingId(lead._id || null);
  };

  // UPDATE LEAD
  const updateLead = async () => {
    try {
      await axios.put(
        `https://smart-leads-dashboard-1-3bf9.onrender.com/api/leads/${editingId}`,
        form
      );

      setForm({
        name: "",
        email: "",
        phone: "",
      });

      setEditingId(null);

      fetchLeads();

      toast.success("Lead Updated");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Toaster />

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fb",
          padding: 30,
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Smart Leads Dashboard
          </h1>

          {/* SEARCH */}
          <div style={{ marginBottom: 20 }}>
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
          </div>

          {/* FORM */}
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              marginBottom: 30,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={editingId ? updateLead : addLead}
                style={{
                  padding: "12px 20px",
                  background: editingId ? "#ff9800" : "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>

          {/* LEADS */}
          <div
            style={{
              display: "grid",
              gap: 20,
            }}
          >
            {leads
              .filter((lead) =>
                lead.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((lead) => (
                <div
                  key={lead._id}
                  style={{
                    background: "white",
                    padding: 20,
                    borderRadius: 12,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <h2>{lead.name}</h2>

                  <p>
                    <strong>Email:</strong> {lead.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {lead.phone}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 10,
                    }}
                  >
                    <button
                      onClick={() => editLead(lead)}
                      style={{
                        background: "#2196f3",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLead(lead._id!)}
                      style={{
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}