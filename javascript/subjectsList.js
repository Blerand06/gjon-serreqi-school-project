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
                                <td>-</td>
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
      }
    });
  });
};

getSubjects();
