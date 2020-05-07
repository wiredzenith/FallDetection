
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
