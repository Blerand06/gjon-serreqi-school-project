const getPlan = async () => {
  try {
    const res = await fetch('/plan/get-plan');
    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('table tbody').innerHTML = '';
      let Plan = data.data;
      for (let i = 0; i < Plan.length; i++) {
        const tr = document.createElement('tr');
        const trContent = `
                                <td>${i + 1}</td>
                                <td><img src="/uploads/${
                                  Plan[i].planDocument
                                }"style="width: 30px; height: 30px; object-fit: cover; border-radius:5px;"></img></td>

                                <td class="primary d-flex">
                                <a href="/admin-plan/${
                                  Plan[i]._id
                                }"><span style= "color: orange;">Ndrysho</span></a>
                                <span style="margin: 0px 5px;">/</span>  
                                <a style="cursor: pointer;"><span delete="true" style="color: red;" id="${
                                  Plan[i]._id
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
        const res = await fetch('/plan/delete-plan', {
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
          getPlan();
          Swal.fire('Fshirë!', 'Plani është fshirë me sukses.', 'success');
        } else {
          Swal.fire(
            'Gabim!',
            'Ka ndodhur një gabim gjatë fshirjes së planit.',
            'error'
          );
        }
      }
    });
  });
};

getPlan();
