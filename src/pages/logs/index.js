import fs from 'fs';

const logs = ({ displayLogFile }) => {
    // console.log('checking');
    return (
        <div>
            {displayLogFile}
        </div>
    )

}

export async function getServerSideProps(context) {
    try {
        const { req } = context;

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1).toString() : currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const displayLogFile = fs.readFileSync(`logs/app-${year}-${month}-${day}.log`).toString();

        return {
            props: {
                displayLogFile
            },
        };
    } catch (err) {
        return {
            props: {
                error: err.message,
            },
        };
    }
}

export default logs
