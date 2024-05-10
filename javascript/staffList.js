const getStaff = async () => {
  try {
    const res = await fetch('/staff/get-staff');
    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('table tbody').innerHTML = '';
      let Staff = data.data;
      for (let i = 0; i < Staff.length; i++) {
        const tr = document.createElement('tr');
        const staffCVCheck = Staff[i].staffCV ? Staff[i].staffCV : '';
        const trContent = `
        <td>${i + 1}</td>
        <td>${Staff[i].staffName}</td>
        <td><img src="/uploads/${
          Staff[i].staffPhoto
        }"style="width: 30px; height: 30px; object-fit: cover; border-radius:5px;"></img></td>
        <td>${staffCVCheck}</td>
        <td>${Staff[i].staffRole}</td>
        <td>${Staff[i].staffCategory}</td>
        <td>${Staff[i].staffSubject}</td>
        <td class="primary d-flex">
                                <a href="/admin-staff/${
                                  Staff[i]._id
                                }"><span style= "color: orange;">Ndrysho</span></a>
                                <span style="margin: 0px 5px;">/</span>  
                                <a style="cursor: pointer;"><span style="color: red;" delete="true" id="${
                                  Staff[i]._id
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
      const res = await fetch('/staff/delete-staff', {
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
        getStaff();
      }
    });
  });
};

getStaff();
