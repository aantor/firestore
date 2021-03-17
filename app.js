const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const personList = $('ul');
const form = $('form');
const cross = document.createElement('span');

function renderPerson(doc) {
  const li = document.createElement('li');
  const name = document.createElement('span');
  const city = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = `Name: ${doc.data().name} `;
  city.textContent = `City: ${doc.data().city} `;

  cross.textContent = 'X';
  cross.style.border = '1px solid red';
  cross.classList.add('cross');

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  personList.appendChild(li);
}
// read
// db.collection('persons').where('city','==','dhaka').orderBy('city')
db.collection('persons')
  .get()
  .then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      //   const { name, roll, first, last, born } = doc.data();
      //   console.log(name, roll, first, last, born);
      renderPerson(doc);
    });
  });

// add
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('persons').add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = '';
  form.city.value = '';
});

//delete
cross.addEventListener('click', (e) => {
  e.stopPropagation(); //stop event bubling. this is optional;/
  let id = e.target.parentElement.getAttribute('data-id');
  db.collection('persons').doc(id).delete();
  console.log('clicked');
});
