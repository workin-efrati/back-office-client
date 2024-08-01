import './EditQa.scss'
import { useApi } from '../../hooks/useApi'
import { useEffect, useState } from 'react'
import { UploadChat } from '../../components/UploadChat'
import { MdDelete } from "react-icons/md";

export default function EditQa() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [deletedMsg, setDeletedMsg] = useState([]);
  const [alert, setAlert] = useState();
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [expandedAnswer, setExpandedAnswer] = useState(null);
  const [editObj, setEditObj] = useState({
    question: [],
    answer: [],
    title: '',
    tags: []
  });

  const fechData = async () => {
    const result = await useApi({ method: 'POST', body: { "from": "5/26/20, 21:19", "to": "5/27/20, 21:19", "limit": 1000 }, url: '/messages' })
    return result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  useEffect(() => {
    fechData().then((data) => {
      setQuestions(data.filter(msg => msg.isQuestion))
      setAnswers(data.filter(msg => !msg.isQuestion))
    }

    )
  }, [])


  const displayDate = (date) => {
    date = new Date(date)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const expandQuestion = (key) => setExpandedQuestion(expandedQuestion === key ? null : key);
  const expandAnswer = (key) => setExpandedAnswer(expandedAnswer === key ? null : key);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item._id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = e.dataTransfer.getData('text/plain');
    if (!itemId) return
    const item = questions.find(i => i._id === itemId) || answers.find(i => i._id === itemId);
    if (!item) return
    setAnswers(prevItems => prevItems.filter(i => i._id !== itemId));
    setQuestions(prevItems => prevItems.filter(i => i._id !== itemId));
    if (field === 'delet') setDeletedMsg(prev => [...prev, item]);
    else
      setEditObj(prev => ({
        ...prev,
        [field]: [...prev[field], item]
      }));
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };



  return (
    <div className='home'>
      <h1>עריכת שאלות ותשובות</h1>
      <h2 className='alert'>{alert && alert}</h2>
      <UploadChat setAlert={setAlert} />
      <div className='messagesContainer'>
        <div className='messages'>
          {questions?.map((msg, key) => (
            <div onClick={() => expandQuestion(key)}
              draggable
              onDragStart={(e) => handleDragStart(e, msg)}
              key={key}
              className={`message question ${expandedQuestion === key && 'expendedMes'}`}>
              <div className='date'  >{`${msg.sender}, ${displayDate(msg.date)}`}</div>
              {msg.message}
            </div>
          ))}
        </div>
        <div className='editContainer'>
          <span>כותרת</span>
          <div className='div_editor' contentEditable suppressContentEditableWarning={true}  ></div>
          <span>שאלה</span>
          <div className='div_editor'
            contentEditable suppressContentEditableWarning={true}
            onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'question')} >
            {editObj.question?.map(q => q.message)} </div>
          <span>תשובה</span>
          <div className='div_editor'
            contentEditable suppressContentEditableWarning={true}
            onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'answer')}  >
            {editObj.answer?.map(a => a.message)}</div>
        </div>
        <div className='messages'>
          {answers?.map((msg, key) => (
            <div onClick={() => expandAnswer(key)}
              draggable onDragStart={(e) => handleDragStart(e, msg)}
              key={key}
              className={`message answer ${expandedAnswer === key && 'expendedMes'}`}>
              <div className='date'>{`הרב אפרתי, ${displayDate(msg.date)}`}</div>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
      <MdDelete className='trash' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'delet')} ></MdDelete>

    </div>
  );
}  