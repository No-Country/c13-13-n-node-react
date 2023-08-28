"use client";
import React from 'react';

const about = () => {
  return (
    <div className="container mt-5" style={{ marginBottom: '100px', marginLeft: '10px' }}
>
      <div className="row" style={{justifyContent:'space-around'}}>
        <div className="col-md-4" style={{ width: '20%' }}>
          {/* Puedes incluir aquí el logo de la aplicación */}
          <img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693179230/NoCountry/Copia_de_ChatApp_creative_logo.Creative_Chat_Logo___1_-removebg-preview_wx1cpp.png" alt="Logo" className="img-fluid"  />
        </div>
        <div className="col-md-8">
          <h2>Tell me</h2>
          <hr />
         <h4>Un Espacio para Conectar e Intercambiar Ideas</h4> 
<p>
Bienvenido a Tell me, un emocionante espacio en línea diseñado para fomentar la comunicación y el intercambio de ideas entre usuarios de todo el mundo. Esta API te brinda acceso a una plataforma de chat versátil que ofrece múltiples salas de chat donde puedes unirte a conversaciones en curso o crear tus propias salas con temáticas de tu interés.
</p>
<h5>¿Qué Ofrecemos?</h5>
<ul></ul>
<ul>

Nuestro Chat es mucho más que una simple plataforma de mensajería. Te invitamos a explorar las características clave que hacen que nuestra plataforma sea única:

<li>Salas de Chat Diversas: Descubre una amplia variedad de salas de chat, cada una dedicada a diferentes temas y áreas de interés. Ya sea que estés buscando discutir tecnología, arte, deportes o cualquier otro tema, encontrarás un espacio para ti.</li>
<li>
Conexiones Globales: Únete a una comunidad global de usuarios apasionados que comparten tus intereses. A través de nuestras salas de chat, podrás interactuar con personas de diferentes culturas y antecedentes, lo que enriquecerá tus perspectivas.</li>
<li>
Creación de Salas Personalizadas: Si no encuentras una sala que se ajuste a tu interés, ¡no hay problema! Nuestra API te permite crear tus propias salas de chat. Define la temática, elige un nombre y personaliza la configuración para que se ajuste perfectamente a lo que deseas discutir.</li>
<li>
Gestión de Contenido: Mantén el control total sobre las conversaciones en tus salas. Podrás moderar el contenido, expulsar usuarios no deseados y garantizar que las conversaciones se mantengan respetuosas y productivas.</li>
<li>Interfaz Amigable: Nuestra plataforma presenta una interfaz intuitiva y fácil de usar, lo que te permitirá sumergirte en las conversaciones sin problemas. Ya sea en tu computadora de escritorio o dispositivo móvil, estarás conectado dondequiera que estés.</li>
</ul>

<h5>Cómo Empezar</h5>
<p>
  Para comenzar a utilizar nuestra aplicación, simplemente sigue estos pasos:
<br /> <br />
<b>Registro y Autenticación:</b> Regístrate en nuestra plataforma y obtén las credenciales de autenticación necesarias para acceder a la API.
<br />
<b>Explora Salas:</b> Utiliza nuestro buscador para explorar las salas de chat disponibles. Obtén detalles sobre las temáticas, los usuarios activos y más.
<br />
<b>Únete y Participa:</b> Únete a las salas que te interesen y comienza a participar en las conversaciones. Si no encuentras una sala que se adapte a ti, crea la tuya propia.
<br />
<b>Administra Tus Salas:</b> Si eres dueño de una sala, utiliza nuestras funciones de administración para gestionar el contenido y mantener un ambiente positivo.(Próximamente)
<br />
<b>Construye y Colabora:</b> Utiliza nuestra API para construir tus propias aplicaciones o integraciones que aprovechen nuestra plataforma de chat. ¡Las posibilidades son infinitas!
<br /><br />
<strong>En la API de Chat, creemos en el poder de la comunicación y la colaboración. Te invitamos a unirte a nosotros en este emocionante viaje de conectar mentes y compartir conocimientos. ¡Empieza hoy y forma parte de una comunidad en constante crecimiento!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default about;