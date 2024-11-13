// script.js

// Seleciona elementos do DOM
const photoForm = document.getElementById("photoForm");
const photoInput1 = document.getElementById("photoInput1");
const nameInput1 = document.getElementById("nameInput1");
const photoInput2 = document.getElementById("photoInput2");
const nameInput2 = document.getElementById("nameInput2");
const photoGallery = document.getElementById("photoGallery");
const voteButton = document.getElementById("voteButton");
const voteSelect = document.getElementById("voteSelect");

// Array para armazenar fotos e nomes
let photos = [];

// Função para exibir fotos na galeria
function updatePhotoGallery() {
    // Limpa a galeria antes de exibir as novas fotos
    photoGallery.innerHTML = "";
    
    // Cria elementos de imagem para cada foto enviada
    photos.forEach((photo, index) => {
        const photoDiv = document.createElement("div");
        photoDiv.classList.add("photo-container");

        const img = document.createElement("img");
        img.src = photo.url;
        img.alt = photo.name;
        img.classList.add("photo");

        const caption = document.createElement("p");
        caption.textContent = photo.name;

        photoDiv.appendChild(img);
        photoDiv.appendChild(caption);
        photoGallery.appendChild(photoDiv);
    });
}

// Manipulador de envio do formulário
photoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Verifica se ambos os inputs têm arquivos e nomes
    if (photoInput1.files[0] && photoInput2.files[0] && nameInput1.value && nameInput2.value) {
        // Cria URLs para as fotos e salva as informações no array
        const photo1 = {
            url: URL.createObjectURL(photoInput1.files[0]),
            name: nameInput1.value
        };
        const photo2 = {
            url: URL.createObjectURL(photoInput2.files[0]),
            name: nameInput2.value
        };

        photos = [photo1, photo2]; // Substitui fotos anteriores
        updatePhotoGallery(); // Atualiza a galeria
    }
});

// Função de votação
voteButton.addEventListener("click", function() {
    const selectedOption = voteSelect.value;

    // Exibe a combinação escolhida pelo usuário
    if (selectedOption === "combination1") {
        alert(`Você escolheu a combinação: ${photos[0].name} e ${photos[1].name}`);
    } else if (selectedOption === "combination2") {
        alert(`Você escolheu a combinação: ${photos[1].name} e ${photos[0].name}`);
    }
});

// Funções para compartilhar no Telegram e WhatsApp
function shareTelegram() {
    const message = "Confira esta foto incrível!";
    const url = window.location.href;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`, '_blank');
}

function shareWhatsApp() {
    const message = "Confira esta foto incrível!";
    const url = window.location.href;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)} ${encodeURIComponent(url)}`, '_blank');
}
