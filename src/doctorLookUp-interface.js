import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';
import { DoctorLookUp } from './doctorLookUp.js';

$(document).ready(function() {
  $('#lookUp').submit(function(event) {
    event.preventDefault();
    let symptom = $('#symptom').val();
    let doctorName = $('#doctorName').val();
    $('#symptom').val("");
    $('#doctorName').val("");

    let findADoctor = new DoctorLookUp();
    findADoctor.getDoctor(symptom, doctorName).then((response) => {
      let text = JSON.parse(response);
      $('#output').append(`<h1>Doctor Search Results:</h1>`);
      text.forEach((doc) => {
        $('#output').append(`<h1> Name: ${doc.name} </h1>`)
        $('#output').append(`<h1> Address: ${doc.visit_address} </h1>`)
        $('#output').append(`<h1> Phone: ${doc.phones}</h1>`)
        $('#output').append(`<h1> Website: ${doc.website} </h1>`)
        $('#output').append(`<h1> Accepting Patients: ${doc.accepts_new_patients}</h1>`)
        $('#output').append(`<h1></h1>`)
        $('#output').append(`<h1></h1>`)

      })
    });
  });
});
