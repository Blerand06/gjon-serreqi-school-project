const getRole = async () => {
  try {
    const res = await fetch('/role/get-role');
    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('table tbody').innerHTML = '';
      let Role = data.data;
      for (let i = 0; i < Role.length; i++) {
        const tr = document.createElement('tr');
        const trContent = `
          <td>${i + 1}</td>
          <td>${Role[i].roleName}</td>
          <td>
            <a style="cursor: pointer;"><span delete="true" style="color: red;" id="${
              Role[i]._id
            }">Fshi</span></a>
          </td>
        `;
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
      }
    }
  } catch (error) {
    console.log(error);
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
      });

      if (result.isConfirmed) {
        const res = await fetch('/role/delete-role', {
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
          getRole();
          Swal.fire('Fshirë!', 'Profesioni është fshirë me sukses.', 'success');
        } else {
          Swal.fire(
            'Gabim!',
            'Ka ndodhur një gabim gjatë fshirjes së profesionit.',
            'error'
          );
        }
      }
    });
  });
};

getRole();
