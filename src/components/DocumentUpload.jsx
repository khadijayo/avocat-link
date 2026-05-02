import { useState } from "react";

export default function DocumentUpload({ role, onChange }) {
    const [files, setFiles] = useState([]);

    const handleFiles = (e) => {
        const selected = Array.from(e.target.files);
        setFiles(selected);
        onChange(selected);
    };

    return (
        <div style={{ marginTop: "20px" }}>

            <label style={{ fontWeight: "bold" }}>
                Upload Documents ({role})
            </label>

            {role === "lawyer" && (
                <p style={{ color: "red", fontSize: "14px" }}>
                    ⚠ Required: certifications & diplomas
                </p>
            )}

            <input
                type="file"
                multiple
                onChange={handleFiles}
                accept=".pdf,.jpg,.png,.doc,.docx"
                style={{ marginTop: "10px" }}
            />

            {/* FILE LIST */}
            <ul>
                {files.map((file, i) => (
                    <li key={i}>
                        📄 {file.name}
                    </li>
                ))}
            </ul>

        </div>
    );
}