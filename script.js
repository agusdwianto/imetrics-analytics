async function fetchData() {
    let doi = document.getElementById('doiInput').value || "10.1016/j.jbusres.2023.113840";
    
    // Bersihkan format DOI
    doi = doi.replace('https://doi.org/', '');

    try {
        const response = await fetch(`https://api.openalex.org/works/https://doi.org/${doi}`);
        const data = await response.json();

        // Update UI
        document.getElementById('citeVal').innerText = data.cited_by_count;
        document.getElementById('readVal').innerText = Math.floor(data.cited_by_count * 5.5); // Estimasi reads
        document.getElementById('shareVal').innerText = Math.floor(Math.random() * 15);
        
        // Logika skor inovasi sederhana
        const finalScore = Math.min(99, Math.floor(data.cited_by_count * 0.8 + 20));
        document.getElementById('scoreVal').innerText = finalScore;

    } catch (error) {
        alert("DOI not found or API error.");
    }
}

// Jalankan otomatis saat pertama kali load
window.onload = fetchData;