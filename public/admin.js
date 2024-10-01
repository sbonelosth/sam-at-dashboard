async function captureAsset(e) {
    e.preventDefault();
    let assetName = document.getElementById("asset-name").value;
    let assetClass = document.getElementById("asset-class").value;
    let assetType = document.getElementById("asset-type").value;
    let assetId = document.getElementById("asset-id").value;
    
    const response = await fetch("http://localhost:8080/capture", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assetName, assetClass, assetType, assetId }),
        mode: "cors"
    });

    let data = await response.json();
    let captureError = document.getElementById("capture-error");
    if (response.ok) {
        window.location.href = "admin.html";
    } else {
        captureError.style.display = "block";
        captureError.innerHTML = data.error;
    }
}

document.getElementById("capture-asset-form").addEventListener("submit", captureAsset);