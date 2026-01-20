  function addRow() {
    const subjects = document.getElementById("subjects");

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <select>
        <option value="">Grade</option>
        <option value="1">1.00</option>
        <option value="1.25">1.25</option>
        <option value="1.50">1.50</option>
        <option value="1.75">1.75</option>
        <option value="2">2.00</option>
        <option value="2.25">2.25</option>
        <option value="2.50">2.50</option>
        <option value="2.75">2.75</option>
        <option value="3">3.00</option>
        <option value="5">5.00</option>
      </select>

      <input type="number" step="0.01" placeholder="Units">
      <button class="delete-btn" onclick="deleteRow(this)">✖</button>
    `;

    subjects.appendChild(row);
  }

  function deleteRow(button) {
    const rows = document.querySelectorAll(".row");
    if (rows.length === 1) {
      alert("At least one subject is required.");
      return;
    }
    button.parentElement.remove();
  }

  function calculateGWA() {
    const rows = document.querySelectorAll(".row");
    let totalWeighted = 0;
    let totalUnits = 0;

    rows.forEach(row => {
      const grade = parseFloat(row.children[0].value);
      const units = parseFloat(row.children[1].value);

      if (!isNaN(grade) && !isNaN(units)) {
        totalWeighted += grade * units;
        totalUnits += units;
      }
    });

    const result = document.getElementById("result");

    if (totalUnits === 0) {
      result.textContent = "Please complete all fields.";
      return;
    }

    const gwa = totalWeighted / totalUnits;

    const message = gwa === 5
      ? "Aray, keri yan!"
      : "Saur galing!🎉🎉🎉";

    result.innerHTML = `
      Your GWA is: ${gwa.toFixed(3)}<br>
      <small>${message}</small>
    `;

    if (gwa <= 3) launchConfetti();
  }

  function launchConfetti() {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor =
        `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.animationDuration =
        (Math.random() * 2 + 2) + "s";

      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  function clearAll() {
    const subjects = document.getElementById("subjects");
    subjects.innerHTML = `
      <div class="row">
        <select>
          <option value="">Grade</option>
          <option value="1">1.00</option>
          <option value="1.25">1.25</option>
          <option value="1.50">1.50</option>
          <option value="1.75">1.75</option>
          <option value="2">2.00</option>
          <option value="2.25">2.25</option>
          <option value="2.50">2.50</option>
          <option value="2.75">2.75</option>
          <option value="3">3.00</option>
          <option value="5">5.00</option>
        </select>

        <input type="number" step="0.01" placeholder="Units">
        <button class="delete-btn" onclick="deleteRow(this)">✖</button>
      </div>
    `;
    document.getElementById("result").textContent = "Enter your grades and units";
  }