// Note: In public/index.html, render a target div: <div id="modal-root"></div>.
// ​Portals allow rendering child elements into a different part of the DOM tree (like #modal-root) while preserving normal React event bubbling.

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// ==========================================
// SUBTOPIC 12.1: CREATEPORTAL FOR MODALS & OVERLAYS
// ==========================================
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Render modal content inside "modal-root" div instead of parent DOM container
  const modalRoot = document.getElementById('modal-root') || document.body;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
        {children}
        <br />
        <button onClick={onClose} style={{ marginTop: '10px' }}>Close Modal</button>
      </div>
    </div>,
    modalRoot // Target DOM Node
  );
}

export default function PortalsTopic() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>12. React Portals Masterclass</h2>
      <button onClick={() => setIsModalOpen(true)}>Open Portal Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Modal Title</h3>
        <p>This markup is rendered outside the main root div, eliminating z-index overflow issues!</p>
      </Modal>
    </div>
  );
}
