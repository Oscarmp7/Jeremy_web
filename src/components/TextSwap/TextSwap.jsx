import './TextSwap.css'

export default function TextSwap({ label, variant = 'nav', className = '' }) {
  const words = label.split(' ')
  let characterIndex = 0

  return (
    <span className={`text-swap text-swap--${variant}${className ? ` ${className}` : ''}`}>
      <span className="text-swap__sr-only">{label}</span>
      <span className="text-swap__visual" aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span className="text-swap__segment" key={`${word}-${wordIndex}`}>
            <span className="text-swap__word">
              {Array.from(word).map((character) => {
                const currentIndex = characterIndex
                characterIndex += 1

                return (
                  <span
                    className="text-swap__char"
                    style={{ '--char-index': currentIndex }}
                    key={`${character}-${currentIndex}`}
                  >
                    <span className="text-swap__layer text-swap__layer--primary">{character}</span>
                    <span className="text-swap__layer text-swap__layer--secondary">{character}</span>
                  </span>
                )
              })}
            </span>

            {wordIndex < words.length - 1 && <span className="text-swap__space" />}
          </span>
        ))}
      </span>
    </span>
  )
}
