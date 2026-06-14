import { useState } from "react";
import { deleteBuilding, getBuildings } from "../api/buildingservice";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getCSRF_TOKEN} from "../api/csrf_tokenservice";
import {IndeterminateCircleLoader} from "@cdkglobal/radial";

function BuildingList() {
    const [buildings, setBuildings] = useState([]);

    const {isLoading: buildingLoading} = useQuery(
        {
            queryKey: ['buildings'],
            queryFn: getBuildings,
            onSuccess: (res) => setBuildings(res.data),
        }
    )
    const { data: csrfData, isLoading: csrfLoading } = useQuery({
        queryKey: ['csrfToken'],
        queryFn: getCSRF_TOKEN
    });

    const handleDelete =
    useMutation({
        mutationFn: (payload) => deleteBuilding(payload,csrfData),
        onSuccess: () => {
            alert("✅ Building deleted!");
            getBuildings().then((res) => setBuildings(res.data));
        }
    });

    if (csrfLoading || buildingLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}
            >
                <IndeterminateCircleLoader
                    ariaLabel="Loading"
                    size="large"
                />
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>🏢 Building Management</h2>

            <div style={gridStyle}>
                {buildings?.map((b) => (
                    <div key={b.id} style={cardStyle}>
                        <div style={headerStyle}>
                            <h3 style={buildingName}>{b.name}</h3>
                            <span style={badgeStyle}>
                                {b.floors.length} Floors
                            </span>
                        </div>

                        <p style={sectionTitle}>Floors</p>

                        <div style={floorContainer}>
                            {b?.floors?.map((f) => (
                                <div key={f.id} style={floorCard}>
                                    <strong>Floor {f.floorNo}</strong>
                                    <p style={companyText}>
                                        {f.companyname}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            style={deleteBtn}
                            onClick={() => handleDelete.mutate(b.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}



const containerStyle = {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
};

const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
};

const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const buildingName = {
    margin: 0,
    color: "#2c3e50",
};

const badgeStyle = {
    background: "#3498db",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
};

const sectionTitle = {
    marginTop: "15px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#555",
};

const floorContainer = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
};

const floorCard = {
    background: "#f0f3f7",
    padding: "10px",
    borderRadius: "8px",
};

const companyText = {
    margin: 0,
    fontSize: "13px",
    color: "#666",
};

const deleteBtn = {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s",
};

export default BuildingList;