import { Center, Input, Tooltip, Image } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface AvatarUploaderProps {
  imageUrl?: string;
  onFieldChange: (url: string) => void;
  setFiles: (files: File[]) => void;
}

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  imageUrl,
  onFieldChange,
  setFiles,
}) => {
  const convertFileToUrl = (file: File) => URL.createObjectURL(file);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <Center {...getRootProps()}>
      <Input {...getInputProps()} id="avatar" cursor="pointer" />
      <Tooltip label="Change your avatar">
        <Image
          alt="profile"
          rounded="full"
          h="24"
          w="24"
          objectFit="cover"
          cursor="pointer"
          mt="2"
          src={imageUrl}
        />
      </Tooltip>
    </Center>
  );
};
