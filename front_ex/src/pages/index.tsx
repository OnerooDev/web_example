import { useState } from "react";
import Head from "next/head";
import { 
  useLoadAppealsQuery, 
  useCreateAppealMutation, 
  useToWorkAppealMutation,
  useToDoneAppealMutation,
  useToCancelAppealMutation,
  useCancelAllAppealMutation
} from "../../generated/graphql";

export default function AppealsPage() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [statusFilter, setStatusFilter] = useState<number | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [{ data: appealsData, fetching: loading }, refetchAppeals] = useLoadAppealsQuery({
      variables: {
        status: statusFilter || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined
      }
    });
  
    const [, createAppeal] = useCreateAppealMutation();
    const [, toWorkAppeal] = useToWorkAppealMutation();
    const [, toDoneAppeal] = useToDoneAppealMutation();
    const [, toCancelAppeal] = useToCancelAppealMutation();
    const [, cancelAllInProgress] = useCancelAllAppealMutation();

    const handleFilter = () => {
        refetchAppeals({
          status: statusFilter || undefined,
          start_date: startDate || undefined,
          end_date: endDate || undefined
        });
      };
    
      const handleResetFilters = () => {
        setStatusFilter(null);
        setStartDate("");
        setEndDate("");
        refetchAppeals({
          status: undefined,
          start_date: undefined,
          end_date: undefined
        });
      };
    
  
    const handleCreateAppeal = async () => {
      if (!title.trim() || !message.trim()) return;
      
      await createAppeal({ 
        title: title.trim(),
        message: message.trim() 
      });
      
      setTitle("");
      setMessage("");
      refetchAppeals();
    };
  
    const handleAction = async (id: number, action: 'work' | 'done' | 'cancel') => {
      switch(action) {
        case 'work':
          await toWorkAppeal({ id });
          break;
        case 'done':
          const answer = prompt("Введите ответ:");
          if (answer) await toDoneAppeal({ id, message: answer });
          break;
        case 'cancel':
          const reason = prompt("Укажите причину отмены:");
          if (reason) await toCancelAppeal({ id, message: reason });
          break;
      }
      refetchAppeals();
    };
  
    const handleCancelAllInProgress = async () => {
      if (confirm("Вы уверены, что хотите отменить ВСЕ обращения в работе?")) {
        await cancelAllInProgress({});
        refetchAppeals();
      }
    };
  
    const getStatusText = (state: number) => {
      switch(state) {
        case 1: return "Новое";
        case 2: return "В работе";
        case 3: return "Завершено";
        case 4: return "Отменено";
        default: return "Неизвестно";
      }
    };
  
    const getStatusClass = (state: number) => {
      switch(state) {
        case 1: return "status-new";
        case 2: return "status-in-progress";
        case 3: return "status-completed";
        case 4: return "status-cancelled";
        default: return "";
      }
    };
  
    return (
      <>
        <Head>
          <title>Управление обращениями</title>
          <meta name="description" content="Система управления обращениями" />
        </Head>
  
        <main className="container">
          <section className="appeal-form">
            <h1>Создать заявку</h1>
            <div className="form-group">
              <label htmlFor="title">Заголовок:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Краткое описание проблемы"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Сообщение:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Подробное описание обращения"
                rows={4}
              />
            </div>
            <button 
              onClick={handleCreateAppeal}
              disabled={!title.trim() || !message.trim()}
              className="btn-primary"
            >
              Создать обращение
            </button>
          </section>
  
          <section className="appeals-list">
          <div className="header-row">
            <h1>Обращения</h1>
            <div className="filter-controls">
              <select
                value={statusFilter || ""}
                onChange={(e) => setStatusFilter(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Все статусы</option>
                <option value="4">Отменено</option>
                <option value="1">Новое</option>
                <option value="2">В работе</option>
                <option value="3">Завершено</option>
              </select>

              <div className="date-filters">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Начальная дата"
                />
                <span>—</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Конечная дата"
                />
              </div>

              <button onClick={handleFilter} className="btn-primary">
                Применить
              </button>
              <button onClick={handleResetFilters} className="btn-secondary">
                Сбросить
              </button>
              
              <button 
                onClick={handleCancelAllInProgress}
                className="btn-danger"
                disabled={!appealsData?.showAppeals?.appeals?.some(a => a.state === 2)}
              >
                Отменить все в работе
              </button>
            </div>
          </div>
            
            {loading ? (
              <p>Загрузка...</p>
            ) : (
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Дата</th>
                      <th>Статус</th>
                      <th>Заголовок</th>
                      <th>Запрос</th>
                      <th>Ответ</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appealsData?.showAppeals?.appeals?.map((appeal) => (
                      <tr key={appeal.id}>
                        <td>{appeal.id}</td>
                        <td>{new Date(parseFloat(appeal.createdAt)).toLocaleString()}</td>
                        <td className={getStatusClass(appeal.state)}>
                          {getStatusText(appeal.state)}
                        </td>
                        <td>{appeal.title}</td>
                        <td className="request-cell">{appeal.request}</td>
                        <td className="answer-cell">{appeal.answer || "-"}</td>
                        <td className="actions-cell">
                          {appeal.state === 1 && (
                            <button 
                              onClick={() => handleAction(appeal.id, 'work')}
                              className="btn-action"
                            >
                              В работу
                            </button>
                          )}
                          {appeal.state === 2 && (
                            <button 
                              onClick={() => handleAction(appeal.id, 'done')}
                              className="btn-action"
                            >
                              Завершить
                            </button>
                          )}
                          {appeal.state !== 0 && appeal.state !== 3 && (
                            <button 
                              onClick={() => handleAction(appeal.id, 'cancel')}
                              className="btn-danger"
                            >
                              Отменить
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </>
  );
}
