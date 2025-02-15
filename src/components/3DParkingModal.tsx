import React from "react";

// Generic Modal Component using Tailwind CSS
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-4 max-w-[90%] max-h-[90%] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// EmbeddedModelModal Component that shows the Sketchfab embed
interface EmbeddedModelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbeddedModelModal: React.FC<EmbeddedModelModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sketchfab-embed-wrapper">
        <iframe
          title="Parking Lot- Blender Baked Lighting GLTF, AR/VR"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="https://sketchfab.com/models/03ddfce6bd90418caea4c83c30d24cf3/embed"
          className="w-[640px] h-[480px]"
        ></iframe>
        <p className="text-sm text-gray-600 font-normal my-2">
          <a
            href="https://sketchfab.com/3d-models/parking-lot-blender-baked-lighting-gltf-arvr-03ddfce6bd90418caea4c83c30d24cf3?utm_medium=embed&utm_campaign=share-popup&utm_content=03ddfce6bd90418caea4c83c30d24cf3"
            target="_blank"
            rel="nofollow"
            className="font-bold text-blue-500"
          >
            Parking Lot- Blender Baked Lighting GLTF, AR/VR
          </a>{" "}
          by{" "}
          <a
            href="https://sketchfab.com/rakibtonoy?utm_medium=embed&utm_campaign=share-popup&utm_content=03ddfce6bd90418caea4c83c30d24cf3"
            target="_blank"
            rel="nofollow"
            className="font-bold text-blue-500"
          >
            Rakib Hossain
          </a>{" "}
          on{" "}
          <a
            href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=03ddfce6bd90418caea4c83c30d24cf3"
            target="_blank"
            rel="nofollow"
            className="font-bold text-blue-500"
          >
            Sketchfab
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default EmbeddedModelModal;
