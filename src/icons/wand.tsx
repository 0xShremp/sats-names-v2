import classNames from "classnames";

export interface IconProps {
  className?: string;
}

const IconWand = ({ className = "w-6 h-6" }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={1.5}
      stroke="currentColor"
      className={classNames([className])}
    >
      <path
        d="M12.7071 11.2929L4.22184 19.7782"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.303 4.38066C19.4986 4.31529 19.6847 4.50145 19.6194 4.69701L18.7456 7.31113L20.4084 9.532C20.533 9.69853 20.4117 9.93559 20.2037 9.93179L17.4465 9.8814L15.8649 12.1266C15.7457 12.2958 15.4844 12.2553 15.4221 12.058L14.5869 9.41316L11.9421 8.57792C11.7448 8.51561 11.7042 8.2543 11.8734 8.13514L14.1186 6.55351L14.0682 3.79637C14.0644 3.58838 14.3015 3.467 14.468 3.59167L16.6889 5.25439L19.303 4.38066Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconWand;
