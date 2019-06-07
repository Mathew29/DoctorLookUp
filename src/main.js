import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';
import { DoctorLookUp } from './doctorLookUp.js';

$(document).ready(function() {
  $('#lookUp').submit(function(event) {
    event.preventDefault();
    let symptom = $('#symptom').val();
    let doctorFirstName = $('#doctorFirstName').val();
    let doctorLastName = $('#doctorLastName').val();
    $('#symptom').val("");
    $('#doctorLastName').val("");

    let findADoctor = new DoctorLookUp();
    let promise = findADoctor.getDoctor(symptom, doctorFirstName, doctorLastName);


    promise.then(function(response) {
      let text = JSON.parse(response);
      console.log(text);

      $('#output').empty();
      $('#output').append(`<h1>Doctor Search Results:</h1><br>`);

      if (text.data.length === 0) {
        $('#output').html('<h1> No Doctor Was Found </h1>');
      }
      text.data.forEach((doc) => {
        let lookingForPatients = 'No'
        if (doc.practices[0].accepts_new_patients != undefined) {
          lookingForPatients = 'Yes'
        }

        let Website = 'None';
        if (doc.practices[0].website != undefined) {
          Website = doc.practices[0].website;
          console.log(doc.practices[0]);
        }
        $('#output').append(`<h1> Name: ${doc.profile.first_name} ${doc.profile.last_name}</h1>`);
        $('#output').append(`<h1> Address: ${doc.practices[0].visit_address.street} ${doc.practices[0].visit_address.city}, ${doc.practices[0].visit_address.state} ${doc.practices[0].visit_address.zip} </h1>`);
        $('#output').append(`<h1> Phone: ${doc.practices[0].phones[0].number}</h1>`);
        $('#output').append(`<h1> Website: ${Website} </h1>`);
        $('#output').append(`<h1> Accepting Patients: ${lookingForPatients}</h1> <br><hr>`);
      });


    }, function(error) {
        $('#output').text(`There was an error processing your request: ${error.message}`);
      });
  });
});
