import { useEffect, useState } from "react";

import Head from "next/head";
import { useLoadAppealsQuery, useCreateAppealMutation, useToWorkAppealMutation } from "../../generated/graphql";

export default function Home() {

  const [tbody, setTbody] = useState<any | null>('Loading');

  const [loaded_appeals, loading] = useLoadAppealsQuery();
  const [, initWallet] = useCreateAppealMutation();

  useEffect(() => {
    let list = document.getElementById('wallets-list');
    if(list == null) return;
    list.innerHTML = '';
    loaded_appeals.data?.showAppeals?.appeals?.forEach((appeal, ids) => {

      let row: HTMLElement = document.createElement('tr');
      row.innerHTML = `<tr><td>${appeal.id}</td><td>${appeal.createdAt}</td><td>${appeal.state}</td><td>${appeal.title}</td><td>${appeal.request}</td><td>${appeal.answer}</td><td>${'To work, Cancel, Finish'}</td>`;
      list.appendChild(row);
    });
    setTbody(list);

  }, [loaded_appeals])


  return (
    <>
      <Head>
        <title>Front Example</title>
        <meta name="description" content="Front Example" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container">
            <h1>Создать заявку</h1>
            <br/>
        </div>

        <div className="container">
            <h1>Обращения</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Заголовок</th>
                        <th>Запрос</th>
                        <th>Ответ</th>
                        <th>Функция</th>
                    </tr>
                </thead>
                <tbody id="appeals-list">
                </tbody>
            </table>
        </div>

    </main>


    </>
  );
}
