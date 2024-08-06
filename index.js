        const form = document.getElementById('recordForm');
        const tableBody = document.getElementById('recordTable').querySelector('tbody');
        const editIndexInput = document.getElementById('editIndex');


        function fetchRecords() {
            const records = JSON.parse(localStorage.getItem('records')) || [];
            tableBody.innerHTML = '';
            records.forEach((record, index) => {
                addRow(record, index);
            });
        }

        function saveRecord(records) {
            localStorage.setItem('records', JSON.stringify(records));
        }
        function addRow(record, index) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.firstName}</td>
                <td>${record.lastName}</td>
                <td>${record.email}</td>
                <td>${record.phoneNumber}</td>
                <td>
                    <button onclick="editRecord(${index})">Edit</button>
                    <button onclick="deleteRecord(${index})">Delete</button>
                    <button onclick="duplicateRecord(${index})">Duplicate</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
        // Adding next page
        const nextButton = document.getElementById('nextButton');

        nextButton.addEventListener('click', () => {
        window.location.href = 'nextpage.html'; // Replace 'nextpage.html' with the actual URL
        });
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const index = parseInt(editIndexInput.value, 10);

            let records = JSON.parse(localStorage.getItem('records')) || [];

            if (index == -1) {
                // Add new record
                records.push({ firstName, lastName, email, phoneNumber });
            } else {
                records[index] = { firstName, lastName, email, phoneNumber };
                editIndexInput.value = -1;
            }

            saveRecord(records);
            loadRecords();
            form.reset();
        });
        function editRecord(index) {
            const records = JSON.parse(localStorage.getItem('records'));
            const record = records[index];
            document.getElementById('firstName').value = record.firstName;
            document.getElementById('lastName').value = record.lastName;
            document.getElementById('email').value = record.email;
            document.getElementById('phoneNumber').value = record.phoneNumber;
            editIndexInput.value = index;
        }
        function deleteRecord(index) {
            let records = JSON.parse(localStorage.getItem('records'));
            records.splice(index, 1);
            saveRecord(records);
            loadRecords();
        }
        function duplicateRecord(index) {
            const records = JSON.parse(localStorage.getItem('records'));
            const record = records[index];
            records.push({ ...record });
            saveRecord(records);
            loadRecords();
        }
        loadRecords();


