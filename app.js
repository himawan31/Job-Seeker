
src="https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"
src="https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js"
src="https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"

    // Konfigurasi Firebase Anda (gantilah dengan konfigurasi proyek Anda)
    const firebaseConfig = {
        apiKey: "AIzaSyBroEr96qj43CqVast2VLpGLSXDoJUgHaU",
        authDomain: "job-seeker-15f1f.firebaseapp.com",
        projectId: "job-seeker-15f1f",
        storageBucket: "gs://job-seeker-15f1f.appspot.com/",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "1:345756093712:android:250f4320d98d9acf39e995"
    };

    // Inisialisasi Firebase
    firebase.initializeApp(firebaseConfig);

    // Referensi Firestore
    const db = firebase.firestore();

    // Menangani pengiriman formulir
    const jobForm = document.getElementById('jobForm');
    jobForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const job_image = document.getElementById('job_image').files[0];
        const job_name = document.getElementById('job_name').value;
        const location = document.getElementById('location').value;
        const salary = document.getElementById('salary').value;
        const working_time = document.getElementById('working_time').value;

        // Unggah gambar pekerjaan ke Firebase Storage
        const storageRef = firebase.storage().ref().child('job_images/' + job_image.name);
        storageRef.put(job_image)
            .then((snapshot) => {
                return snapshot.ref.getDownloadURL();
            })
            .then((downloadURL) => {
                // Simpan data pekerjaan ke Firestore
                return db.collection('job_vacancies').add({
                    job_image: downloadURL,
                    job_name: job_name,
                    location: location,
                    salary: salary,
                    working_time: working_time,
                });
            })
            .then(() => {
                alert('Data pekerjaan berhasil diunggah.');
                jobForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat mengunggah data pekerjaan.');
            });
    });
