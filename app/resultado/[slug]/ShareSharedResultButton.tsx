"use client";

export default function ShareSharedResultButton() {
  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mi resultado en Match Político",
          text: "Mira mi resultado en Match Político",
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      alert("Enlace copiado");
    } catch (error) {
      console.error("Error al compartir el resultado", error);
    }
  };

  return (
    <button
      type="button"
      className="shared-result-share-button"
      onClick={handleShare}
      aria-label="Compartir resultado"
    >
      <span>Compartir</span>
      <svg
        className="shared-result-share-button__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 3v12M12 3l-4 4M12 3l4 4M5 11v8h14v-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
