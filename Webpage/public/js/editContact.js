
function editContact(id) {
  const { value: formValues } = await Swal.fire({
    title: 'Edit contact',
    html:
      '<input id="swal-input1" class="swal2-input" name="Name" placeholder="current name">' +
      '<input id="swal-input2" class="swal2-input" name="Number" placeholder="current number" >',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value
      ]
    }
  })
  
  if (formValues) {
    Swal.fire(JSON.stringify(formValues))
  }
}