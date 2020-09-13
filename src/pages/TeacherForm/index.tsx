import React, { useState, FormEvent, ErrorInfo } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'

import './style.css'

function TeacherForm() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''}
    ])

    function newScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: ''}
        ])
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name, 
            avatar, 
            whatsapp, 
            bio,
            subject,
            cost: Number(cost),
            schedules: scheduleItems
        }).then(() => {
            alert('Aula cadastrada com sucesso.')

            history.push('/')
        }).catch((err: ErrorInfo) => {
            console.log(err.componentStack)
            alert('Erro ao cadastrar aula.')
        })
    }

    function setScheduleItemValue(position:number, field:string, value:string) {
        const resultNewScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setScheduleItems(resultNewScheduleItems)
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que bom que você quer dar aulas." 
                description="O primeiro passo é preencher esse formulário."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input 
                            idInput="name" labelText="Nome Completo"
                            value={name}
                            onChange={(e) =>  {setName(e.target.value)}}
                        />
                        <Input 
                            idInput="avatar" labelText="Avatar"
                            value={avatar}
                            onChange={(e) =>  {setAvatar(e.target.value)}}
                        />
                        <Input 
                            idInput="whatsapp" labelText="WhatsApp"
                            value={whatsapp}
                            onChange={(e) =>  {setWhatsapp(e.target.value)}}
                        />
                        <Textarea 
                            idTextarea="bio" labelText="Bio"
                            value={bio}
                            onChange={(e) =>  {setBio(e.target.value)}}
                        />
                    </fieldset>
                    
                    <fieldset>
                        <legend>Sobra a aula</legend>

                        <Select 
                            idSelect="subject" 
                            labelText="Matéria" 
                            value={subject}
                            onChange={(e) =>  {setSubject(e.target.value)}}
                            options={[
                                {value:'Artes', label:'Artes'},
                                {value:'Biologia', label:'Biologia'},
                                {value:'Ciências', label:'Ciências'},
                                {value:'Educação Física', label:'Educação Física'},
                                {value:'Física', label:'Física'},
                                {value:'Geografia', label:'Artes'},
                                {value:'História', label:'História'},
                                {value:'Matemática', label:'Matemática'},
                                {value:'Português', label:'Português'},
                                {value:'Química', label:'Química'},
                            ]}
                        />
                        <Input 
                            idInput="cost" labelText="Custo da sua hora/aula"
                            value={cost}
                            onChange={(e) =>  {setCost(e.target.value)}}
                        />
                    </fieldset>
                    
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={newScheduleItem}>+ Novo Horário</button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        idSelect="week_day"
                                        labelText="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {value:"0", label:"Domingo"},
                                            {value:"1", label:"Segunda-feira"},
                                            {value:"2", label:"Terça-feira"},
                                            {value:"3", label:"Quarta-feira"},
                                            {value:"4", label:"Quinta-feira"},
                                            {value:"5", label:"Sexta-feira"},
                                            {value:"6", label:"Sábado"}
                                        ]}
                                    />
                                    <Input 
                                        idInput="from" labelText="De:" type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        idInput="to" labelText="Até:" type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}                    
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante!" />
                            Importante! <br />
                            Preencha todos os campos.
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm