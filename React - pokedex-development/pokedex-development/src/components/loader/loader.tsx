import { Loader } from 'rsuite';

export interface ApploaderProps {
  className?: string;
}

const Apploader = ({ className }: ApploaderProps): JSX.Element => (
  <div className={className}>
    <Loader size="md" content="Loading..." />
  </div>
);

export default Apploader;
