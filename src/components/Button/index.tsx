interface ButtonProps {
  text: string;
  size: ButtonSize;
  style: ButtonStyle;
  disable?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
}

type ButtonSize = "xs" | "sm" | "md" | "lg";
type ButtonStyle = "primary" | "secondary" | "time" | "cancel";

const Button = ({
  text,
  size,
  style,
  onClick,
  onSelect,
  disable,
}: ButtonProps) => {
  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-4 py-2 text-lg",
  };

  const sized = sizes[size] || sizes["md"];

  const styles = {
    primary:
      "text-white font-medium bg-gray-800 hover:bg-gray-600 active:bg-gray-900 rounded-lg duration-150 disabled:opacity-50",
    secondary:
      "text-indigo-600 font-medium bg-white hover:bg-gray-100 active:bg-gray-200 rounded-lg duration-150",
    time: "text-black font-medium bg-transparent border border-black hover:bg-gray-100 active:bg-gray-200 focus:bg-green-600 rounded-lg duration-150",
    cancel:
      "text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-700 rounded-lg duration-150 disabled:opacity-50",
  };

  const styled = styles[style] || styles["primary"];

  return (
    <button
      className={`${sized} ${styled} m-0.5`}
      onClick={onClick}
      onSelect={onSelect}
      disabled={disable}
    >
      {text}
    </button>
  );
};

export default Button;
