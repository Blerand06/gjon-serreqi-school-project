const getNews = async () => {
  try {
    const res = await fetch('/news/get-news');
    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('table tbody').innerHTML = '';
      let News = data.data;
      for (let i = 0; i < News.length; i++) {
        const tr = document.createElement('tr');
        const trContent = `
        <td>${i + 1}</td>
        <td>${News[i].newsTitle}</td>
        <td><img src="/uploads/${
          News[i].newsPhoto
        }"style="width: 30px; height: 30px; object-fit: cover; border-radius:5px;"></img></td>
        <td>${News[i].newsDescription}</td>
        <td>${News[i].newsTag}</td>
        <td>${News[i].newsMetaTitle}</td>
        <td>${News[i].newsMetaDescription}</td>
        
        <td class="primary d-flex">
                                <a href="/admin-news/${
                                  News[i]._id
                                }"><span style= "color: orange;">Ndrysho</span></a>
                                <span style="margin: 0px 5px;">/</span>  
                                
                                <a style="cursor: pointer;"><span id="${
                                  News[i]._id
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
        const res = await fetch('/news/delete-news', {
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
          getNews();
          Swal.fire('Fshirë!', 'Lajmi është fshirë me sukses.', 'success');
        } else {
          Swal.fire(
            'Gabim!',
            'Ka ndodhur një gabim gjatë fshirjes së lajmit.',
            'error'
          );
        }
      }
    });
  });
};

getNews();
