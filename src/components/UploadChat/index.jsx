import FileInput from '../FileInput'
import styles from './style.module.scss'

export const UploadChat = ({setAlert}) => {

    const dispayAlert = (content) => {
        setAlert(content)
        setTimeout(() => setAlert(), [3000])
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const file = event.target.elements.file.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
    
          const alertMessage = await useApi({
            method: 'POST',
            body: formData,
            url: '/messages/uploadData'
          });
    
          dispayAlert(alertMessage?.result);
        } else {
          setAlert('Please select a file to upload.');
        }
    
      };
  return (
    <form onSubmit={handleSubmit}>
        <FileInput />
        <button type='submit'>שלח</button>
      </form>
  )
}
