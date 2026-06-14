import { useState } from "react";
import { createBuilding } from "../api/buildingservice";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getCSRF_TOKEN} from "../api/csrf_tokenservice";
import {IndeterminateCircleLoader} from "@cdkglobal/radial";

function BuildingForm() {
    const [form, setForm] = useState({
        name: "",
        nooffloors: "",
        floors: []
    });

    const { data: csrfToken, isLoading } = useQuery({
        queryKey: ['csrfToken'],
        queryFn: getCSRF_TOKEN
    });
    const createMutation = useMutation({
        mutationFn: (payload) => createBuilding(payload, csrfToken),
        onSuccess: () => {
            alert("✅ Building created!");
            setForm({ name: "", nooffloors: "", floors: [] });
        },
        onError: (error) => {
            const status = error?.response?.status;
            if (status === 302 || status === 401 || status === 403) {
                alert("❌ You are not authorized to add building");
            } else {
                alert("❌ Failed to create building");
            }
        }
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const addFloor = () => {
        setForm({
            ...form,
            floors: [...form.floors, { floorNo: "", companyname: "" }]
        });
    };


    const handleFloorChange = (index, field, value) => {
        const updatedFloors = [...form.floors];
        updatedFloors[index][field] = value;

        setForm({
            ...form,
            floors: updatedFloors
        });
    };

    const removeFloor = (index) => {
        const updatedFloors = form.floors.filter((_, i) => i !== index);
        setForm({ ...form, floors: updatedFloors });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            nooffloors: Number(form.nooffloors),
            floors: form.floors.map(f => ({
                floorNo: Number(f.floorNo),
                companyname: f.companyname
            }))
        };

        createMutation.mutate(payload);
    };


    if (isLoading) {
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
            <div style={formCard}>
                <h2 style={titleStyle}>🏗️ Add Building with Floors</h2>

                <form onSubmit={handleSubmit} style={formStyle}>

                    {/* Building name */}
                    <input
                        style={inputStyle}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Building Name"
                        required
                    />


                    <input
                        style={inputStyle}
                        name="nooffloors"
                        type="number"
                        value={form.nooffloors}
                        onChange={handleChange}
                        placeholder="Number of Floors"
                        required
                    />

                    <h4>Floors</h4>

                    {form.floors.map((floor, index) => (
                        <div key={index} style={floorBox}>

                            <input
                                style={inputStyle}
                                type="number"
                                placeholder="Floor No"
                                value={floor.floorNo}
                                onChange={(e) =>
                                    handleFloorChange(index, "floorNo", e.target.value)
                                }
                                required
                            />

                            <input
                                style={inputStyle}
                                placeholder="Company Name"
                                value={floor.companyname}
                                onChange={(e) =>
                                    handleFloorChange(index, "companyname", e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                style={removeBtn}
                                onClick={() => removeFloor(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button type="button" style={addBtn} onClick={addFloor}>
                        ➕ Add Floor
                    </button>

                    <button style={submitBtn} type="submit">
                        {createMutation.isPending ? "Saving..." : "Save Building"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const containerStyle = {
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const formCard = {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
};

const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c3e50",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
};

const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
};

const submitBtn = {
    padding: "12px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s",
};


const floorBox = {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
};

const addBtn = {
    padding: "10px",
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
};

const removeBtn = {
    padding: "6px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

export default BuildingForm;