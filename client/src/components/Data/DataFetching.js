// src/components/data/DataFetchingComponent.js

import React from 'react';
import strapiService from '../../services/StrapiService';

class DataFetchingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            error: null,
            pagination: {
                page: 1,
                pageSize: 10,
                total: 0
            }
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    // Загрузка данных из Strapi
    fetchData = async () => {
        const { contentType, filters, sort, pagination } = this.props;
        const { page, pageSize } = this.state.pagination;

        if (!contentType) {
            this.setState({ error: 'Не указан тип контента' });
            return;
        }

        this.setState({ loading: true, error: null });

        try {
            const queryParams = {
                'pagination[page]': pagination?.page || page,
                'pagination[pageSize]': pagination?.pageSize || pageSize,
            };

            // Добавляем фильтры, если они указаны
            if (filters) {
                Object.keys(filters).forEach(key => {
                    queryParams[`filters[${key}]`] = filters[key];
                });
            }

            // Добавляем сортировку, если она указана
            if (sort) {
                queryParams['sort'] = sort;
            }

            // Получаем данные из Strapi
            const response = await strapiService.get(contentType, queryParams);

            this.setState({
                data: response.data || [],
                loading: false,
                pagination: {
                    page: response.meta?.pagination?.page || 1,
                    pageSize: response.meta?.pagination?.pageSize || 10,
                    total: response.meta?.pagination?.total || 0
                }
            });

            // Вызываем callback с данными, если он есть
            if (this.props.onDataFetched) {
                this.props.onDataFetched(response.data, response.meta);
            }
        } catch (error) {
            this.setState({
                error: error.message || 'Ошибка при загрузке данных',
                loading: false
            });

            // Вызываем callback с ошибкой, если он есть
            if (this.props.onError) {
                this.props.onError(error);
            }
        }
    }

    // Изменение страницы пагинации
    handlePageChange = (newPage) => {
        this.setState(
            prevState => ({
                pagination: {
                    ...prevState.pagination,
                    page: newPage
                }
            }),
            this.fetchData
        );
    }

    // Изменение размера страницы
    handlePageSizeChange = (newPageSize) => {
        this.setState(
            prevState => ({
                pagination: {
                    ...prevState.pagination,
                    pageSize: newPageSize,
                    page: 1 // Сбрасываем на первую страницу при изменении размера
                }
            }),
            this.fetchData
        );
    }

    // Ручное обновление данных
    refreshData = () => {
        this.fetchData();
    }

    render() {
        const { data, loading, error, pagination } = this.state;
        const { render, children } = this.props;

        // Если компонент не предоставляет render-функцию или children, выводим предупреждение
        if (!render && !children) {
            console.warn('DataFetchingComponent: Не указана render-функция или children');
            return null;
        }

        // Используем render prop, если он указан
        if (render) {
            return render({
                data,
                loading,
                error,
                pagination,
                refreshData: this.refreshData,
                handlePageChange: this.handlePageChange,
                handlePageSizeChange: this.handlePageSizeChange
            });
        }

        // Иначе используем children function
        if (typeof children === 'function') {
            return children({
                data,
                loading,
                error,
                pagination,
                refreshData: this.refreshData,
                handlePageChange: this.handlePageChange,
                handlePageSizeChange: this.handlePageSizeChange
            });
        }

        // Если children не функция, выводим предупреждение
        console.warn('DataFetchingComponent: children должен быть функцией');
        return null;
    }
}

export default DataFetchingComponent;