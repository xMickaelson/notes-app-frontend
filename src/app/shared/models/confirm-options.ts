export interface ConfirmOptions {
  header: string;
  message: string;
  accept: () => void;
  reject?: () => void;
  icon?: string;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  acceptLabel?: string;
  rejectLabel?: string;
}
