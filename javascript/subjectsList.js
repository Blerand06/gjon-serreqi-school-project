const getSubjects = async () => {
  try {
    const res = await fetch('/subjects/get-subjects');
    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('table tbody').innerHTML = '';
      let Subjects = data.data;
      for (let i = 0; i < Subjects.length; i++) {
        const tr = document.createElement('tr');
        const trContent = `
                                <td>${i + 1}</td>
                                <td>${Subjects[i].subjectName}</td>
                                <td><img src="/uploads/${
                                  Subjects[i].subjectIcon
                                }"style="width: 30px; height: 30px; object-fit: cover; border-radius:5px;"></img></td>
                                <td>${Subjects[i].subjectCycle}</td>
                                <td>${Subjects[i].subjectClass}</td>

                                <td class="primary d-flex">
                                <a href="/admin-subjects/${
                                  Subjects[i]._id
                                }"><span style= "color: orange;">Ndrysho</span></a>
                                <span style="margin: 0px 5px;">/</span>  
                                <a style="cursor: pointer;"><span id="${
                                  Subjects[i]._id
                                }" delete="true" style="color: red;">Fshi</span></a>
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
      });

      if (result.isConfirmed) {
        const res = await fetch('/subjects/delete-subjects', {
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
          getSubjects();
          Swal.fire('Fshirë!', 'Lënda është fshirë me sukses.', 'success');
        } else {
          Swal.fire(
            'Gabim!',
            'Ka ndodhur një gabim gjatë fshirjes së lëndës.',
            'error'
          );
        }
      }
    });
  });
};

getSubjects();
