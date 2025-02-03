import styles from './AvatarProfile.module.css'

interface AvatarProfileProps {
  avatar: string;
  onClick: () => void;
}

export const AvatarProfile: React.FC<AvatarProfileProps> = ({ avatar, onClick }) => {
  return (
    <div className={styles.profileAvatar} onClick={onClick}>
      <img src={avatar} alt="Аватар" />
      <div className={styles.profileAvatarText}>Поменять <br /> аватар</div>
    </div>
  );
};
