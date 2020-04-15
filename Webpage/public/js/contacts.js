
function removeContact(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to undo this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(function (result) {
    if (result.value) {
      console.log(id);

      var data = { _id: id }

      fetch("/contacts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(function (res) {
        Swal.fire({
          title: "Deleted!",
          text: "Contact Deleted",
          type: "success"
        }).then(function () {
          window.location = "/contacts";
          return console.log("Request complete! response:", res);
        })
      });
    };
  })
}