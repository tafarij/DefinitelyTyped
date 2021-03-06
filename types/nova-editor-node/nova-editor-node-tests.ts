const client = new LanguageClient(
    'apexskier.typescript',
    'Typescript Language Server',
    {
        type: 'stdio',
        path: `/usr/bin/env`,
        args: ['bash', '-c', `${nova.extension.path}/run.sh | tee /tmp/nova-typescript.sh.log`],
        env: {
            WORKSPACE_DIR: nova.workspace.path || '',
        },
    },
    {
        syntaxes: ['typescript'],
    },
);

export function activate() {
    client.start();
}

export function deactivate() {
    client.stop();
}

nova.commands.register('apexskier.foo', (foo: string) => {});

type CustomThis = string & { __t: 'CustomThis' };
const thisValue: CustomThis = 'hello' as CustomThis;
nova.commands.register(
    'apexskier.bar',
    function f(foo: string) {
        // $ExpectType CustomThis
        this;
    },
    thisValue,
);

nova.commands.invoke('apexskier.bar', 'foo');

new CompletionItem('label', CompletionItemKind.Argument);

// after 3.4: $ExpectType unknown
nova.config.get('test');

// $ExpectType string[] | null
nova.config.get('test', 'array');

/// https://novadocs.panic.com/api-reference/emitter/

const emitter = new Emitter();

emitter.on('myEvent', (arg1, arg2, arg3) => {});

function doTask() {
    emitter.emit('myEvent', 'foo', 'bar', 12);
}

/// https://novadocs.panic.com/api-reference/file-system/

nova.fs.copyAsync('src', 'dst', function callback(err) {
    // $ExpectError
    this;
    // $ExpectType Error | undefined
    err;
});

nova.fs.copyAsync(
    'src',
    'dst',
    function callback(err) {
        // $ExpectType CustomThis
        this;
        // $ExpectType Error | undefined
        err;
    },
    thisValue,
);

nova.fs.moveAsync('src', 'dst', function callback(err) {
    // $ExpectError
    this;
    // $ExpectType Error | undefined
    err;
});

nova.fs.moveAsync(
    'src',
    'dst',
    function callback(err) {
        // $ExpectType CustomThis
        this;
        // $ExpectType Error | undefined
        err;
    },
    thisValue,
);

/// https://novadocs.panic.com/api-reference/notification-request/

const request = new NotificationRequest('foobar-not-found');

request.title = nova.localize('Foobar Not Found');
request.body = nova.localize('Enter the path to the foobar tool.');

request.type = 'input';
request.actions = [nova.localize('OK'), nova.localize('Ignore')];

const promise = nova.notifications.add(request);
promise.then(
    reply => {},
    error => {},
);

/// https://novadocs.panic.com/api-reference/path/

nova.path.join('test');
nova.path.join('test', 'a', 'b');

/// https://novadocs.panic.com/api-reference/process/

// Launches the Python executable to determine its current version
const options = {
    args: ['python', '--version'],
};

const process = new Process('/usr/bin/env', options);

process.onStdout(line => {});

process.start();

process.notify('didSave', { file: 'foo.txt' });

process.request('getNames', { sort: 'alpha' }).then(reply => {
    // $ExpectType any
    reply.result;
});

process.onNotify('didConnect', message => {});

type ParamType = string & { __t: 'ParamType' };
type ReplyType = string & { __t: 'ReplyType' };
type ErrorType = string & { __t: 'ErrorType' };
process.onRequest('getCount', request => {
    return new Promise((resolve, reject) => {
        resolve({ count: 10 });
    });
});

/// https://novadocs.panic.com/api-reference/text-editor/

// $ExpectError
new TextEditor();

/// https://novadocs.panic.com/api-reference/tree-view/

class MyDataProvider implements TreeDataProvider<{ name: string }> {
    getChildren(element: { name: string }): Array<{ name: string }> | Promise<Array<{ name: string }>> {
        throw new Error('Method not implemented.');
    }
    getTreeItem(element: { name: string }): TreeItem {
        throw new Error('Method not implemented.');
    }
}

// Create the TreeView
const treeView = new TreeView('my-identifier', {
    dataProvider: new MyDataProvider(),
});

treeView.onDidChangeSelection(selection => {});

treeView.onDidExpandElement(element => {});

treeView.onDidCollapseElement(element => {});

treeView.onDidChangeVisibility(() => {});
