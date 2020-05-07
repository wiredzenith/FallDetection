/**
 * Remove contact function. removes contact from database on button click.
 * receives one parameter id, the id of the contact to be deleted. using 
 * sweetalerts2 displays conformation dialog before sending a post request
 * to the express api to delete the entry from the database
 *
 * @param {*} id -- id no. of the entry to be deleted
 */
function removeContact(id) {
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to undo this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then( function (result) {

    
    if (result.value) {
      console.log(id);

      fetch("/contacts/" + id, {
        method: "delete"
      }).then(async function (res) {
var response = await res.json();
console.log(response);
         
        if (response.n) {
          Swal.fire({
            title: "Deleted!",
            text: "Contact Deleted",
            type: "success"
          }).then(function () {
            window.location = "/contacts";
            return console.log("Request complete! response:", res);
          })
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Contact Deleted",
            type: "error"
          }).then(function () {
            window.location = "/contacts";
            return console.log("Request complete! response:", res);
          })
        }
      });
    };
  })
}
