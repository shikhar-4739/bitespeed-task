# Chatbot Flow Builder

This project aims to create a simple and extensible Chatbot Flow Builder using React. The builder will allow users to design chatbot flows by connecting multiple messages together to determine their order of execution.

![WhatsApp Flow Builder](https://placeholder-for-screenshot.png)

## Features

- **Visual Flow Builder**: Drag and drop interface to create conversation flows
- **Node Customization**: Edit node content and properties in a dedicated settings panel
- **Real-time Updates**: See your changes immediately as you edit node properties
- **Connection Management**: Connect nodes with directional arrows to define the conversation flow
- **Persistent Storage**: Save your flows to local storage and load them when you return
- **Validation**: Flow validation to ensure proper connections between nodes

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/bite-speed-frontend-task.git
cd bite-speed-frontend-task
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Creating a Flow

1. **Add Nodes**: Drag message nodes from the right sidebar onto the canvas
2. **Connect Nodes**: Click and drag from one node's handle to another to create connections
3. **Edit Nodes**: Click on a node to edit its content in the right sidebar settings panel
4. **Save Flow**: Click the "Save Flow" button to save your work to local storage



## Project Structure

```
bite-speed-frontend-task/
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── FlowCanvas.jsx
│   │   ├── Navbar.jsx
│   │   ├── NodesPanel.jsx
│   │   └── SettingsPanel.jsx
│   ├── nodes/
│   │   ├── CustomNode.jsx
│   │   └── index.js
├── package.json
└── README.md
```

## Technologies Used

- **Next.js**: React framework for building the application
- **React Flow**: Library for building node-based editors and interactive diagrams
- **React Hooks**: For state management and side effects
- **CSS-in-JS**: For styling components
- **LocalStorage API**: For persisting flow data

## Development

### Adding New Node Types

To add a new node type:

1. Create a new node component in the `nodes` directory
2. Update the `nodeRegistry` in `nodes/index.js` to include your new node type
3. Add any specific styling or functionality for the new node type

### Customizing Styles

The application uses a combination of inline styles and CSS classes. To modify the visual appearance:

1. Update global styles in `app/globals.css`
2. Modify component-specific styles within each component file

## Future Enhancements

- Add more node types (input collection, condition checks, etc.)
- Implement user authentication
- Add cloud storage options
- Enable sharing and collaboration features
- Add template library for common conversation patterns

## License

[MIT](LICENSE)

## Acknowledgments

- Built using [React Flow](https://reactflow.dev/)
- Developed as part of the Bite Speed Frontend Task
