moment.locale('sq');

const getContact = async () => {
  try {
    const res = await fetch('/contact/get-contact');
    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('table tbody').innerHTML = '';
      let Contact = data.data;
      for (let i = 0; i < Contact.length; i++) {
        const tr = document.createElement('tr');
        const trContent = `
        
        <td>${Contact[i].contactEmail}</td>
        <td>${Contact[i].contactTitle}</td>
        <td>${
          Contact[i].contactMessage && Contact[i].contactMessage.length > 30
            ? Contact[i].contactMessage.slice(0, 27) + '...'
            : Contact[i].contactMessage
        }</td>
        <td>${moment(Contact[i].createdAt).format('DD MMMM,')} <br> ${moment(
          Contact[i].createdAt
        ).format('YYYY ')}</td>

        <td style="padding-right: 0">
          <a href="/admin-more-contact/${
            Contact[i]._id
          }"><button class="btn btn-primary">Shiko të gjithën</button>
        </td>

        <td style="padding-left: 0">
          <button class="btn" style="background-color: #e72d18" id="${
            Contact[i]._id
          }" delete="true" >
            <i class="fa-solid fa-trash" style="color: white" delete="true" id="${
              Contact[i]._id
            }"></i>
          </button>
        </td>

          `;
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
      }
    }
  } catch (error) {
    console.error(error);
  }

  const deleteButtons = document.querySelectorAll('[delete="true"]');
  deleteButtons.forEach((element) => {
    element.addEventListener('click', async (event) => {
      const result = await Swal.fire({
        title: 'Jeni të sigurt që dëshironi ta fshini?',
        icon: 'warning',
        iconColor: '#e72d18',
        showCancelButton: true,
        confirmButtonText: 'Fshini',
        cancelButtonText: 'Anuloje',
        customClass: {
          confirmButton: 'swal-confirm-button-red',
        },
      });

      if (result.isConfirmed) {
        const res = await fetch('/contact/delete-contact', {
          method: 'DELETE',
          body: JSON.stringify({
            id: event.target.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();

        if (data.status === 'success') {
          getContact();
          Swal.fire(
            'Fshirë!',
            'Emaili i dërguar është fshirë me sukses.',
            'success'
          );
        } else {
          Swal.fire(
            'Gabim!',
            'Ka ndodhur një gabim gjatë fshirjes së emailit të dërguar.',
            'error'
          );
        }
      }
    });
  });
};

getContact();
