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
                                <td>${Plan[i].planYear}</td>
                                <td>-</td>

                                <td class="primary d-flex">
                                <a href="/admin-plan/${
                                  Plan[i]._id
                                }"><span style= "color: orange;">Ndrysho</span></a>
                                <span style="margin: 0px 5px;">/</span>  
                                <a style="cursor: pointer;"><span id="${
                                  Plan[i]._id
                                }" delete="true" style="color: red;">Fshi</span></a>
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
      }
    });
  });
};

getPlan();
