import { spawn } from 'child_process';

export default async (url: any) => {
    return new Promise(function (resolve, reject) {
        let process = spawn('bash');
        const command = `curl --head ${url} | grep ocation`;
        try {
            process.stdin.write(command);
            process.stdout.on('data', (data) => {
                resolve(data.toString());
            })
            process.stdin.end();
            process.on('close', function (code) {
                if (code != 0) {
                    resolve("error");
                }
            });
        } catch (err) {
            resolve("error");
        }
    })
}